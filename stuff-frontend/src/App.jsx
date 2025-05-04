import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root.jsx";
import Error404 from "./routes/Error404.jsx";
import Students from "./routes/students.jsx";
import Teachers from "./routes/teachers.jsx";
import Reminders from "./routes/reminders.jsx";
import Reports from "./routes/reports.jsx";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error404 />,
      children: [
        {
          path: "students",
          element: <Students />
        },
        {
          path: "teachers",
          element: <Teachers />
        },
        {
          path: "reminders",
          element: <Reminders />
        },
        {
          path: "reports",
          element: <Reports />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App;