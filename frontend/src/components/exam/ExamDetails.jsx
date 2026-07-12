export default function ExamDetails({
  examData,
  setExamData,
}) {
  const updateField = (field, value) => {
    setExamData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section
      className="
        glass
        rounded-3xl
        border
        border-white/10
        p-8
      "
    >
      <h2 className="mb-8 text-2xl font-bold text-white">
        Examination Details
      </h2>

      <div className="space-y-6">

        {/* Title */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Exam Title
          </label>

          <input
            type="text"
            placeholder="Database Management Systems Mid-1"
            value={examData.title}
            onChange={(e) =>
              updateField("title", e.target.value)
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
              placeholder:text-slate-500
              outline-none
              transition
              focus:border-indigo-500
            "
          />

        </div>

        {/* Description */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Description
          </label>

          <textarea
            rows={4}
            placeholder="Write a short description..."
            value={examData.description}
            onChange={(e) =>
              updateField("description", e.target.value)
            }
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

        {/* Duration & Passing Score */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Duration (Minutes)
            </label>

            <input
              type="number"
              value={examData.duration}
              onChange={(e) =>
                updateField("duration", e.target.value)
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

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Passing Score (%)
            </label>

            <input
              type="number"
              value={examData.passingScore}
              onChange={(e) =>
                updateField("passingScore", e.target.value)
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

      </div>

    </section>
  );
}