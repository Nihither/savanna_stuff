import {createBrowserRouter,  RouterProvider} from "react-router-dom";
import RootPage, {rootLoader} from "./routes/rootPage.jsx";
import Error404 from "./routes/Error404.jsx";
import StudentsPage from "./routes/studentsPage.jsx";
import TeachersPage from "./routes/teachersPage.jsx";
import RemindersPage from "./routes/remindersPage.jsx";
import ReportsPage from "./routes/reportsPage.jsx";
import TeacherProfilePage from "./routes/teacherProfilePage.jsx";
import StudentProfilePage from "./routes/studentProfilePage.jsx";
import LoginPage from "./routes/loginPage.jsx";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: rootLoader,
      element: <RootPage />,
      errorElement:
        <RootPage>
          <Error404 />
        </RootPage>,
      children: [
        {
          path: "students",
          element: <StudentsPage />
        },
        {
          path: "teachers",
          element: <TeachersPage />
        },
        {
          index: true,
          path: "reminders",
          element: <RemindersPage />
        },
        {
          path: "reports",
          element: <ReportsPage />
        },
        {
          path: "teachers/:id",
          element: <TeacherProfilePage />
        },
        {
          path: "students/:id",
          element: <StudentProfilePage />
        }
      ]
    },
    {
      path: "login",
      element: <LoginPage />
    }
  ])

  return <RouterProvider router={router} />
}