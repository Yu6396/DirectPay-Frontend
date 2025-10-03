import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Labels } from "../../components/ui/Labels";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/Auth/AuthAction";
import {
  setFormField,
  resetForm,
  resetSignupSuccess,
  setShowpassword,
} from "../../redux/Auth/AuthSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, signupSuccess, loading, error, showPassword } = useSelector(
    (state) => state.auth
  );
  const handleChange = (e) => {
    dispatch(setFormField({ field: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(form));
  };
  useEffect(() => {
    if (signupSuccess) {
      dispatch(resetForm());
      navigate("/auth");
      dispatch(resetSignupSuccess());
    }
    if (error) {
      error.message && alert(error.message);
      dispatch(resetForm());
      dispatch(resetSignupSuccess());
    }
  }, [signupSuccess, error, navigate, dispatch]);

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
            value={form.first_name}
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
            value={form.last_name}
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
            value={form.email}
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
            value={form.phone_number}
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
            value={form.password}
            onChange={handleChange}
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => dispatch(setShowpassword(!showPassword))}
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
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default Signup;
