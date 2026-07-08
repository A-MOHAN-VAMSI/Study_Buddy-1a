import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function UpcomingExams() {
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExams = async () => {
      try {
        const { data } = await api.get("/exams");
        setExams(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadExams();
  }, []);

  if (loading) {
    return <p>Loading exams...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="sb-upcoming"
    >
      <div className="sb-card-header">
        <h2>Upcoming Exams</h2>
        <span>{exams.length} Scheduled</span>
      </div>

      <div className="sb-upcoming-grid">
        {exams.map((exam) => (
          <motion.div
            key={exam.id}
            whileHover={{ y: -5 }}
            className="sb-upcoming-card"
          >
            <div className="sb-upcoming-icon">
              <CalendarDays size={22} />
            </div>

            <h3>{exam.title}</h3>

            <p>Passing Score : {exam.passingScore}%</p>

            <small>Duration : {exam.duration} mins</small>

            <button
              className="sb-start-btn"
              onClick={() => navigate(`/take-exam/${exam.id}`)}
            >
              Take Exam
              <ArrowRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}