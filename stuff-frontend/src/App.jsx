import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root.jsx";
import Error404 from "./routes/Error404.jsx";
import Students from "./routes/students.jsx";
import Teachers from "./routes/teachers.jsx";
import Reminders from "./routes/reminders.jsx";
import Reports from "./routes/reports.jsx";
import TeacherProfile from "./routes/teacher_profile.jsx";
import StudentProfile from "./routes/student_profile.jsx";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      // errorElement: <Error404 />,
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
        },
        {
          path: "teachers/:id",
          element: <TeacherProfile />
        },
        {
          path: "students/:id",
          element: <StudentProfile />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}