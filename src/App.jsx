/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router"
import { allRoutes } from "./routes/routes"
import Container from "./components/layout/container"
import ProtectedRoute from "./commons/protectedRoute"


export default function App() {
  const RenderRoute = ({ data }) => {
    const Element = data.element

    return data.protected ? (
      <ProtectedRoute>
        <Element />
      </ProtectedRoute>
    ) : (
      <Element />
    )
  }

  return (
    <Router>
      <Routes>
        {allRoutes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            element={<RenderRoute data={route} />}
          />
        ))}
      </Routes>
    </Router>
  )
}
