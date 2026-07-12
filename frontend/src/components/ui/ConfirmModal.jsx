import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onCancel,
  onConfirm,
}) {
  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/60
            backdrop-blur-sm
          "
        >

          <motion.div
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/10
              bg-[#111827]
              p-8
            "
          >

            <div className="mb-6 flex items-center gap-4">

              <div className="rounded-xl bg-red-500/10 p-3">

                <AlertTriangle
                  className="text-red-400"
                  size={28}
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-white">
                  {title}
                </h2>

                <p className="mt-1 text-slate-400">
                  {message}
                </p>

              </div>

            </div>

            <div className="flex justify-end gap-4">

              <button
                onClick={onCancel}
                className="
                  rounded-xl
                  border
                  border-white/10
                  px-5
                  py-2.5
                  text-white
                  hover:bg-white/5
                "
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="
                  rounded-xl
                  bg-red-500
                  px-5
                  py-2.5
                  font-semibold
                  text-white
                  hover:bg-red-600
                "
              >
                Delete
              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}