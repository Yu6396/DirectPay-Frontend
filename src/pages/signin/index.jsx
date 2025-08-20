import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Labels } from "../../components/ui/Labels";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://directpay-hcgw.onrender.com/api/v1/user";

const Signin = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/dashboard");
  //   }
  // }, []);

  function handleChange(e) {
    setInitialValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios(`${API_URL}/login/user`, {
        method: "POST",
        data: initialValues,
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("token", response.headers.authorization);

      const decodedToken = jwtDecode(response.headers.authorization);
      localStorage.setItem("user", JSON.stringify(decodedToken));
      console.log(decodedToken);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Labels htmlFor="email">Email</Labels>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={initialValues.email}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Labels htmlFor="password">Password</Labels>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={initialValues.password}
            onChange={handleChange}
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};

export default Signin;
