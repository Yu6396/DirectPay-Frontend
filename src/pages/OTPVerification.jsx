import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/InputOtp";
import { useToast } from "../hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { verifyOtp, resendOtp } from "../redux/Auth/AuthAction";
import { resetOtpState } from "../redux/Auth/AuthSlice";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { loading, otpVerified, otpSent, error } = useSelector((state) => state.auth);

  // Get email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("pendingEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate("/auth"); 
    }
  }, [navigate]);
  
  useEffect(() => {
    if (otpVerified) {
      toast({
        title: "Verification Successful 🎉",
        description: "Your account has been verified. Please sign in.",
      });
      localStorage.removeItem("pendingEmail");
      dispatch(resetOtpState());
      navigate("/auth");
    }
  }, [otpVerified, navigate, dispatch, toast]);

  
  useEffect(() => {
    if (otpSent) {
      toast({
        title: "OTP Sent ✉️",
        description: "A new verification code has been sent to your email.",
      });
      dispatch(resetOtpState());
    }
  }, [otpSent, toast, dispatch]);

  
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error ❌",
        description: error,
      });
    }
  }, [error, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter a 6-digit code",
      });
      return;
    }
    dispatch(verifyOtp({ email, otp }));
  };

  const handleResend = () => {
    if (!email) return;
    dispatch(resendOtp({ email }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/auth")}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl">Verify OTP</CardTitle>
          </div>
          <CardDescription>
            Enter the 6-digit code sent to your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={handleResend}
                className="text-sm"
                disabled={loading}
              >
                Didn’t receive code? Resend
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;
