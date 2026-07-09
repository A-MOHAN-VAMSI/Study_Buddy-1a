import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import StudentSearch from "../components/admin/StudentSearch";
import StudentStats from "../components/admin/StudentStats";
import StudentTable from "../components/admin/StudentTable";

export default function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadStudents = async () => {
    try {
      const { data } = await api.get("/admin/students");
      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const keyword = search.toLowerCase();

      return (
        student.name.toLowerCase().includes(keyword) ||
        student.email.toLowerCase().includes(keyword)
      );
    });
  }, [students, search]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-slate-400">
        Loading students...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <StudentSearch
        value={search}
        onChange={setSearch}
      />

      <StudentStats
        students={filteredStudents}
      />

      <StudentTable
        students={filteredStudents}
        onView={(student) =>
          navigate(`/admin/students/${student.id}`)
        }
      />

    </div>
  );
}