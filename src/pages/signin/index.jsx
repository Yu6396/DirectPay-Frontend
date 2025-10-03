import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from "../../redux/Auth/AuthAction";
import { setFormField, resetForm, setShowpassword } from "../../redux/Auth/AuthSlice";
import { Labels } from "../../components/ui/Labels";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";


const Signin = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const { form, loading, error, showPassword, isAuthenticated } = useSelector((state) => state.auth);
 const handleChange = (e) => {
    dispatch(setFormField({ field: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: form.email, password: form.password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
    if (error) {
      error.message && alert(error.message);
      dispatch(resetForm());
    }
  }, [isAuthenticated, error, navigate]);


 

  

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
            value={form.email}
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
