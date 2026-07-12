import { Trophy, Medal } from "lucide-react";
import { motion } from "framer-motion";

export default function TopStudents({ students }) {

  const topStudents = [...students]
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-8"
    >
      <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-white">
        <Trophy className="text-yellow-400" />
        Top Performers
      </h2>

      <div className="space-y-4">

        {topStudents.map((student, index) => (

          <div
            key={student.id}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              bg-white/5
              p-4
              border
              border-white/10
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  h-12
                  w-12
                  rounded-full
                  bg-indigo-500/20
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-white
                "
              >
                {student.name.charAt(0)}
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  {student.name}
                </h3>

                <p className="text-sm text-slate-400">
                  {student.email}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <span className="text-2xl font-bold text-emerald-400">
                {student.averageScore}%
              </span>

              {index === 0 && (
                <Medal
                  className="text-yellow-400"
                />
              )}

            </div>

          </div>

        ))}

      </div>

    </motion.div>
  );
}