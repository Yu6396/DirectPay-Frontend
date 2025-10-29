import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { useToast } from "../hooks/use-toast";
import { Lock, Eye, EyeOff } from "lucide-react";
import { completeForgetPassword } from "../redux/Auth/AuthAction";
import { resetForm, resetPasswordResetState } from "../redux/Auth/AuthSlice";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/InputOtp";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loading, passwordReset, passwordResetToastShown } = useSelector((state) => state.auth);

  const email = localStorage.getItem("pendingEmail");

  // redirect if no email
  useEffect(() => {
    if (!email) navigate("/auth");
  }, [email, navigate]);

  
  useEffect(() => {
    if (passwordReset && !passwordResetToastShown) {
      toast({
        title: "Password Reset ✅",
        description: "Your password has been updated. Please login.",
      });

      localStorage.removeItem("pendingEmail");
      dispatch(resetForm());
      dispatch(resetPasswordResetState()); 

      navigate("/auth");
    }
  }, [passwordReset, passwordResetToastShown, toast, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    if (!otp || otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
      });
      return;
    }

    try {
      await dispatch(
        completeForgetPassword({ email, otp, newPassword, confirmPassword })
      ).unwrap();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error ❌",
        description: err.message || "Failed to reset password",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter OTP and your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center">
                         <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                           <InputOTPGroup>
                             {[...Array(6)].map((_, i) => (
                               <InputOTPSlot key={i} index={i} />
                             ))}
                           </InputOTPGroup>
                         </InputOTP>
                       </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="pl-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
