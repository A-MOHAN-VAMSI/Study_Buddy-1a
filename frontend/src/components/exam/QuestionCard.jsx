import { Trash2, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

import QuestionOptions from "./QuestionOptions";

export default function QuestionCard({
  question,
  index,
  updateQuestion,
  removeQuestion,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="
        glass
        rounded-3xl
        border
        border-white/10
        p-8
      "
    >
      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-indigo-500/15
            "
          >
            <HelpCircle
              size={22}
              className="text-indigo-400"
            />
          </div>

          <div>

            <h3 className="text-xl font-bold text-white">
              Question #{index + 1}
            </h3>

            <p className="text-sm text-slate-400">
              Configure this question
            </p>

          </div>

        </div>

        <button
          onClick={() => removeQuestion(index)}
          className="
            rounded-xl
            bg-red-500/10
            px-4
            py-3
            text-red-400
            transition
            hover:bg-red-500/20
          "
        >
          <Trash2 size={18} />
        </button>

      </div>

      {/* Question */}

      <div>

        <label className="mb-2 block text-sm text-slate-300">
          Question
        </label>

        <textarea
          rows={3}
          value={question.questionText}
          onChange={(e) =>
            updateQuestion(index, {
              ...question,
              questionText: e.target.value,
            })
          }
          placeholder="Enter your question..."
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-3
            text-white
            placeholder:text-slate-500
            outline-none
            transition
            focus:border-indigo-500
          "
        />

      </div>

      {/* Type + Points */}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Question Type
          </label>

          <select
            value={question.type}
            onChange={(e) =>
              updateQuestion(index, {
                ...question,
                type: e.target.value,
              })
            }
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-indigo-500
            "
          >
            <option value="mcq">
              Multiple Choice
            </option>

            <option value="text">
              Short Answer
            </option>

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Marks
          </label>

          <input
            type="number"
            value={question.points}
            onChange={(e) =>
              updateQuestion(index, {
                ...question,
                points: Number(e.target.value),
              })
            }
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-indigo-500
            "
          />

        </div>

      </div>

      {/* Options */}

      <QuestionOptions
        question={question}
        updateQuestion={(updatedQuestion) =>
          updateQuestion(index, updatedQuestion)
        }
      />

      {/* Short Answer */}

      {question.type === "text" && (

        <div className="mt-6">

          <label className="mb-2 block text-sm text-slate-300">
            Correct Answer
          </label>

          <textarea
            rows={2}
            value={question.correctAnswer}
            onChange={(e) =>
              updateQuestion(index, {
                ...question,
                correctAnswer: e.target.value,
              })
            }
            placeholder="Expected answer..."
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              text-white
              placeholder:text-slate-500
              outline-none
              transition
              focus:border-indigo-500
            "
          />

        </div>

      )}

    </motion.div>
  );
}