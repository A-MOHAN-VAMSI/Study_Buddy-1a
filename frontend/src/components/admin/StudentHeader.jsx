import { Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function StudentHeader({ student }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-8 flex justify-between items-center"
    >
      <div className="flex items-center gap-6">

        <div
          className="
            h-20
            w-20
            rounded-full
            bg-gradient-to-br
            from-indigo-500
            to-violet-600
            flex
            items-center
            justify-center
            text-3xl
            font-bold
            text-white
          "
        >
          {student.name?.charAt(0).toUpperCase()}
        </div>

        <div>

          <h1 className="text-4xl font-bold text-white">
            {student.name}
          </h1>

          <div className="flex gap-6 mt-3 text-slate-400">

            <div className="flex items-center gap-2">

              <Mail size={16} />

              {student.email}

            </div>

            <div className="flex items-center gap-2">

              <Calendar size={16} />

              Joined{" "}
              {new Date(student.joined).toLocaleDateString()}

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}