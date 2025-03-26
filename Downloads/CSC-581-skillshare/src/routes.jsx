import { Home, Profile, SignIn, SignUp} from "@/pages";
import StudentMarketplace from "@/pages/StudentMarketplace";
import SkillShare from "@/pages/SkillShare"; // Import the new Skill Share page
import Resources from "./pages/Resources";
import Torocare from "@/pages/Torocare"; // ✅ Add this at the top


export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "marketplace",
    path: "/marketplace",
    element: <StudentMarketplace />,
  },
  {
    name: "skill share",
    path: "/skill-share",
    element: <SkillShare />,
  },
  {
    name: "Torocare",
    path: "/torocare",
    element: <Torocare />,
  },
  
  {
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    name:"Resources",
    path:"/resources",
    element: <Resources />,
  }
];

export default routes;
