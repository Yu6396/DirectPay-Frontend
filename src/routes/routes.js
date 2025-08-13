import { lazy } from "react"
import { allPaths } from "./paths"

const Landing = lazy(() => import("../pages/landing"))
// const Login = lazy(() => import("../pages/login"))
// const Signup = lazy(() => import("../pages/signup"))
const Auth = lazy(() => import("../pages/Auth"))
const Dashboard = lazy(() => import("../pages/dashBoard"))

export const allRoutes = [
  {
    path: allPaths.landing,
    element: Landing,
    hasContainer: true,
    protected: false,
  },
  {
    path: allPaths.auth,
    element: Auth,
    hasContainer: false,
    protected: false,
  },
  {
    path: allPaths.dashboard,
    element: Dashboard,
    hasContainer: false,
    protected: false,
  }
]
