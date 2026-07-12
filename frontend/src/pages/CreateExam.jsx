import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import api from "../services/api";

import AnimatedPage from "../components/common/AnimatedPage";
import Skeleton from "../components/ui/Skeleton";

import ExamHeader from "../components/exam/ExamHeader";
import ExamDetails from "../components/exam/ExamDetails";
import QuestionCard from "../components/exam/QuestionCard";
import PublishBar from "../components/exam/PublishBar";

const defaultQuestion = () => ({
  questionText: "",
  type: "mcq",
  options: ["", "", "", ""],
  correctAnswer: "",
  points: 1,
});

export default function CreateExam() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const editExamId = searchParams.get("edit");

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [examData, setExamData] = useState({
    title: "",
    description: "",
    duration: 30,
    passingScore: 40,
  });

  const [questions, setQuestions] = useState([
    defaultQuestion(),
  ]);

  useEffect(() => {
    if (!editExamId) return;

    const loadExam = async () => {
      try {
        setFetching(true);

        const res = await api.get(
          `/exams/${editExamId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const exam = res.data;

        setExamData({
          title: exam.title,
          description: exam.description || "",
          duration: exam.duration,
          passingScore: exam.passingScore,
        });

        setQuestions(
          exam.questions.map((q) => ({
            id: q.id,
            questionText: q.questionText,
            type: q.type,
            options: Array.isArray(q.options)
              ? q.options
              : ["", "", "", ""],
            correctAnswer: q.correctAnswer,
            points: q.points,
          }))
        );
      } catch (err) {
        console.error(err);

        toast.error("Unable to load examination.");

        navigate("/admin");
      } finally {
        setFetching(false);
      }
    };

    loadExam();
  }, [editExamId]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      defaultQuestion(),
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) {
      toast.error(
        "An exam must contain at least one question."
      );
      return;
    }

    setQuestions((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateQuestion = (
    index,
    updatedQuestion
  ) => {
    const updated = [...questions];

    updated[index] = updatedQuestion;

    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!examData.title.trim()) {
    toast.error("Please enter an exam title.");
    return;
  }

  if (!examData.duration) {
    toast.error("Please enter the exam duration.");
    return;
  }

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    if (!q.questionText.trim()) {
      toast.error(`Question ${i + 1} is empty.`);
      return;
    }

    if (!q.correctAnswer.trim()) {
      toast.error(
        `Question ${i + 1} has no correct answer.`
      );
      return;
    }

    if (q.type === "mcq") {
      const hasEmptyOption = q.options.some(
        (option) => !option.trim()
      );

      if (hasEmptyOption) {
        toast.error(
          `Please complete all options for Question ${i + 1}.`
        );
        return;
      }
    }
  }

  try {
    setLoading(true);

    const payload = {
      title: examData.title,
      description: examData.description,
      duration: Number(examData.duration),
      passingScore: Number(examData.passingScore),
      questions,
    };

    if (editExamId) {
      await api.put(
        `/exams/${editExamId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Exam updated successfully.");
    } else {
      await api.post(
        "/exams",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Exam created successfully.");
    }

    navigate("/admin");

  } catch (err) {

    console.error(err);

    toast.error(
      err.response?.data?.message ||
      "Failed to save examination."
    );

  } finally {

    setLoading(false);

  }
};
if (fetching) {
  return (
    <AnimatedPage>
      <div className="space-y-6">

        <Skeleton className="h-20 w-full" />

        <Skeleton className="h-64 w-full rounded-3xl" />

        <Skeleton className="h-72 w-full rounded-3xl" />

      </div>
    </AnimatedPage>
  );
}

return (
  <AnimatedPage>

    <div className="mx-auto max-w-7xl px-6 py-8">

      <ExamHeader />

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        <ExamDetails
          examData={examData}
          setExamData={setExamData}
        />

        <section className="space-y-6">

          {questions.map((question, index) => (

            <QuestionCard
              key={question.id || index}
              question={question}
              index={index}
              updateQuestion={updateQuestion}
              removeQuestion={removeQuestion}
            />

          ))}

        </section>

        <PublishBar
          addQuestion={addQuestion}
          loading={loading}
          submitExam={handleSubmit}
        />

      </form>

    </div>

  </AnimatedPage>
);

}