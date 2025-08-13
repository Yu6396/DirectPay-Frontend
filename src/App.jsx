/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router"
import { allRoutes } from "./routes/routes"
import Container from "./components/layout/container"
import ProtectedRoute from "./commons/protectedRoute"

export default function App() {
  const RenderRoute = ({ data }) => {
    const Element = data.element

    const content = data.hasContainer ? (
      <Container>
        <Element />
      </Container>
    ) : (
      <Element />
    )

    return data.protected ? <ProtectedRoute>{content}</ProtectedRoute> : content
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
