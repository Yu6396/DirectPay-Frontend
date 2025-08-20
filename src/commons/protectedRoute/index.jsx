import React, { useEffect } from "react"
import { Navigate, useNavigate } from "react-router"
import { allPaths } from "../../routes/paths"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"
// import { Toastify } from "../../shared/toastify"

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("auth")
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token)
      const isExp = decoded.exp * 1000 < Date.now()
      try {
        if (isExp) {
          Cookies.remove("auth")
          navigate(allPaths.login)
          Toastify("error", "Session expired, please login")
        }
      } catch (error) {
        console.log("Error decoding token:", error)
      }
    }
  }, [token, navigate])

  const isAuthenticated =!!token

  if (!isAuthenticated) {
    return <Navigate to={allPaths.auth} />
  }

  return children
}

export default ProtectedRoute
