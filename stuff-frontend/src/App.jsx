import {createBrowserRouter,  RouterProvider} from "react-router-dom";
import Root, {rootLoader} from "./routes/root.jsx";
import Error404 from "./routes/Error404.jsx";
import Students from "./routes/students.jsx";
import Teachers from "./routes/teachers.jsx";
import Reminders from "./routes/reminders.jsx";
import Reports from "./routes/reports.jsx";
import TeacherProfile from "./routes/teacherProfile.jsx";
import StudentProfile from "./routes/studentProfile.jsx";
import SignIn from "./routes/signIn.jsx";
import {Layout} from "./routes/layout.jsx";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: rootLoader,
      element: <Root />,
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
          index: true,
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
        },
        {
          path: "*",
          element: <Error404 />
        }
      ]
    },
    {
      path: "login",
      element: <SignIn />
    }
  ])

  return <RouterProvider router={router} />
}