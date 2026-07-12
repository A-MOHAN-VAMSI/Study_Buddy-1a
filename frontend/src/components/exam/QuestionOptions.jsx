export default function QuestionOptions({
  question,
  updateQuestion,
}) {
  if (question.type !== "mcq") return null;

  const updateOption = (index, value) => {
    const updated = [...question.options];
    updated[index] = value;

    updateQuestion({
      ...question,
      options: updated,
    });
  };

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">

      <h4 className="mb-5 text-lg font-semibold text-white">
        Configure MCQ Options
      </h4>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {["A", "B", "C", "D"].map((letter, index) => (

          <div key={index}>

            <label className="mb-2 block text-sm text-slate-400">
              Option {letter}
            </label>

            <input
              type="text"
              value={question.options[index]}
              placeholder={`Option ${letter}`}
              onChange={(e) =>
                updateOption(index, e.target.value)
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

        ))}

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-sm text-slate-400">
          Correct Answer
        </label>

        <select
          value={question.correctAnswer}
          onChange={(e) =>
            updateQuestion({
              ...question,
              correctAnswer: e.target.value,
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
          <option value="">Select Correct Option</option>

          {question.options.map((option, index) => (

            <option
              key={index}
              value={option}
            >
              {option || `Option ${String.fromCharCode(65 + index)}`}
            </option>

          ))}

        </select>

      </div>

    </div>
  );
}