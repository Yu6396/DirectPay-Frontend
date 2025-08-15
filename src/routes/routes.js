import { lazy } from "react"
import { allPaths } from "./paths"

const Landing = lazy(() => import("../pages/landing"))
// const Login = lazy(() => import("../pages/login"))
// const Signup = lazy(() => import("../pages/signup"))
const Auth = lazy(() => import("../pages/Auth"))
const Dashboard = lazy(() => import("../pages/dashBoard"))
const NotFound = lazy(() => import("../pages/NotFound"))
const History = lazy(() => import("../pages/histrory"))
const Settings = lazy(() => import("../pages/settings"))
const Security = lazy(() => import("../pages/security"))
const FundWallet = lazy(() => import("../pages/fundWallet"))

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
  },
  {
    path: allPaths.history,
    element: History,
    hasContainer: false,
    protected: false,
  },
  {
    path: allPaths.settings,
    element: Settings,
    hasContainer: false,
    protected: false,
  },
  {
    path: allPaths.security,
    element: Security,
    hasContainer: false,
    protected: false,
  },
  {
    path: allPaths.fundWallet,
    element: FundWallet,
    hasContainer: false,
    protected: false,
  },
  {
    path: allPaths.notFound,
    element: NotFound,
    hasContainer: false,
    protected: false,
  },
]
