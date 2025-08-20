import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthFailure() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth"); // send them back to login after 3s
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-red-600 text-2xl font-bold">Google Login Failed</h1>
      <p className="text-gray-600 mt-2">Redirecting back to login...</p>
    </div>
  );
}


