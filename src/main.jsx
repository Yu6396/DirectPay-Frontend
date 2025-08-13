import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
  </StrictMode>
)
