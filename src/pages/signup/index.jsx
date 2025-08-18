import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Labels } from "../../components/ui/Labels";
import { Eye, EyeOff, Mail, User,Lock } from "lucide-react";
import axios from "axios";
const API_URL = "https://directpay-hcgw.onrender.com/api/v1/user";

const Signup = () => {
  const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
  });

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
      const response = await axios(`${API_URL}/create/user`, {
        method: "POST",
        data: initialValues,
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("email",initialValues.email);
      console.log(response.data.message);
      navigate("/auth");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Labels htmlFor="email">First Name</Labels>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="first_name"
            name="first_name"
            type="name"
            placeholder="Enter your first name"
            value={initialValues.first_name}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Labels htmlFor="email">Last Name</Labels>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="last_name"
            name="last_name"
            type="name"
            placeholder="Enter your last name"
            value={initialValues.last_name}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </div>
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
        <Labels htmlFor="email">Phone Number</Labels>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone_number"
            name="phone_number"
            type=""
            placeholder="Enter your phone number"
            value={initialValues.phone_number}
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
      <div className="space-y-2">
        <Labels htmlFor="password">Confirm Password</Labels>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="confirm your password"
            value={initialValues.confirmPassword}
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

      <Button  type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default Signup;
