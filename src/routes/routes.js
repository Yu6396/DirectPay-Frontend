import { lazy } from "react"
import { allPaths } from "./paths"


const Landing = lazy(() => import("../pages/landing"))
const Auth = lazy(() => import("../pages/Auth"))
const Dashboard = lazy(() => import("../pages/dashBoard"))
const NotFound = lazy(() => import("../pages/NotFound"))
const History = lazy(() => import("../pages/histrory"))
const Settings = lazy(() => import("../pages/settings"))
const Security = lazy(() => import("../pages/security"))
const FundWallet = lazy(() => import("../pages/fundWallet"))
const AuthSuccess = lazy(() => import("../pages/Auth/Success"))
const AuthFailure = lazy(() => import("../pages/Auth/Failure"))
const BillCategories = lazy(() => import("../pages/bills_categories"))
const OTPVerification = lazy(() => import("../pages/OTPVerification"))
const ForgetPassword = lazy(() => import("../pages//ForgetPassword"))
const CompleteForgetPassword = lazy(() => import("../pages/ResetPassword"))


export const allRoutes = [
  {
    path: allPaths.landing,
    element: Landing,
    protected: false,
  },
  {
    path: allPaths.auth,
    element: Auth,
    protected: false,
  },
  {
    path: allPaths.dashboard,
    element: Dashboard,
    protected: true,
  },
  {
    path: allPaths.history,
    element: History,
    protected: true,
  },
  {
    path: allPaths.settings,
    element: Settings,
    protected: true,
  },
  {
    path: allPaths.security,
    element: Security,
    protected: true,
  },
  {
    path: allPaths.fundWallet,
    element: FundWallet,
    protected: true,
  },
  {
    path: allPaths.notFound,
    element: NotFound,
    protected: false,
  },
  {
    path: allPaths.success,
    element: AuthSuccess,
    protected: false,
  },
  {
    path: allPaths.failure,
    element: AuthFailure,
    protected: false,
  },
  {
    path: allPaths.billCategories,
    element: BillCategories,
    protected: false,
  },
  {
    path: allPaths.otpVerification,
    element: OTPVerification,
    protected: false,
  },
  {
    path: allPaths.forgetPassword,
    element: ForgetPassword,
    protected: false,
  },
  {
    path: allPaths.completeForgetPassword,
    element: CompleteForgetPassword,
    protected: false,
  }

]
