import auth from "../middleware/auth";
import guest from "../middleware/guest";

let authPages = {
  // path: "/admin",
  // redirect: "/admin/dashboard",
  // component: Admin,
  // children: [
  //   {
  //     path: "/admin/dashboard",
  //     component: Dashboard,
  //     meta: { middleware: auth },
  //   },
  // ],
};
const routes = [
  authPages,
  // {
  //   path: "/auth",
  //   redirect: "/auth/login",
  //   component: Auth,
  //   children: [
  //     {
  //       path: "/auth/login",
  //       component: Login,
  //       meta: { middleware: guest },
  //     },
  //     {
  //       path: "/auth/register",
  //       component: Register,
  //       meta: { middleware: guest },
  //     },
  //   ],
  // },

  { path: "/:pathMatch(.*)*", redirect: "/" },
];

export default routes;
