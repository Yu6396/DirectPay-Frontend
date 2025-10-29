import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { allPaths } from "../../routes/paths";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (processed) return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);

      setProcessed(true);

      // Redirect to dashboard after storing token
      navigate(allPaths.dashboard, { replace: true });
    } else {
      navigate(allPaths.auth, { replace: true });
    }
  }, [navigate, processed]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Logging in with Google...</p>
    </div>
  );
};

export default GoogleSuccess;
