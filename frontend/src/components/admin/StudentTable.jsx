import StudentCard from "./StudentCard";

export default function StudentTable({
  students,
  onView,
}) {

  if (students.length === 0) {

    return (

      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-white/10
          p-16
          text-center
          text-slate-400
        "
      >
        No students found.

      </div>

    );

  }

  return (

    <div className="grid gap-6">

      {students.map((student) => (

        <StudentCard
          key={student.id}
          student={student}
          onView={onView}
        />

      ))}

    </div>

  );

}