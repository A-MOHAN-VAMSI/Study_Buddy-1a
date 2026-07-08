import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Shield, GraduationCap } from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/api";
import Input from "../ui/Input";
import Button from "../ui/Button";
import PasswordInput from "./PasswordInput";

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", form);

      toast.success("Registration successful!");

      navigate("/login");

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <Input
        label="Full Name"
        name="name"
        placeholder="John Doe"
        value={form.name}
        onChange={handleChange}
        icon={<User size={18} />}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="john@example.com"
        value={form.email}
        onChange={handleChange}
        icon={<Mail size={18} />}
      />

      <PasswordInput
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      <div className="sb-input-group">

        <label className="sb-label">
          Account Type
        </label>

        <div className="sb-input-wrapper">

          <Shield
            size={18}
            className="sb-input-icon"
          />

          <select
            className="sb-input sb-input-with-icon"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="student">
              🎓 Student
            </option>

            <option value="admin">
              👨‍🏫 Faculty / Admin
            </option>

          </select>

        </div>

      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full mt-4"
        leftIcon={<GraduationCap size={18} />}
      >
        Create Account
      </Button>

    </form>
  );
}