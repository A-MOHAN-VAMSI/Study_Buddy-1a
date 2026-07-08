import { motion } from "framer-motion";
import {
  CheckCircle2,
  Trophy,
  Clock3,
} from "lucide-react";

const activities = [
  {
    id: 1,
    icon: <CheckCircle2 size={20} />,
    title: "Completed Java Programming",
    subtitle: "Scored 91%",
    color: "#22c55e",
  },
  {
    id: 2,
    icon: <Trophy size={20} />,
    title: "Rank Improved",
    subtitle: "Moved to #12",
    color: "#f59e0b",
  },
  {
    id: 3,
    icon: <Clock3 size={20} />,
    title: "AI Exam Scheduled",
    subtitle: "Next Monday",
    color: "#8b5cf6",
  },
];

export default function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="sb-activity"
    >
      <div className="sb-card-header">
        <h2>Recent Activity</h2>
        <span>Latest Updates</span>
      </div>

      <div className="sb-activity-list">
        {activities.map((item) => (
          <motion.div
            whileHover={{ x: 6 }}
            key={item.id}
            className="sb-activity-item"
          >
            <div
              className="sb-activity-icon"
              style={{ background: item.color }}
            >
              {item.icon}
            </div>

            <div className="sb-activity-content">
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}