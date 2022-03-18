import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Profile from "@/views/admin/Profile.vue";
import News from "@/views/admin/News.vue";
import FormNews from "@/views/admin/news/Form.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Landing from "@/views/Landing.vue";
import Index from "@/views/Index.vue";
import Pricing from "@/views/Pricing.vue";
import Pages from "@/layouts/Pages.vue";
import auth from "../middleware/auth";
import guest from "../middleware/guest";

let authPages = {
  path: "/admin",
  redirect: "/admin/dashboard",
  component: Admin,
  children: [
    {
      path: "/admin/dashboard",
      component: Dashboard,
      meta: { middleware: auth },
    },
    {
      path: "/admin/Profile",
      component: Profile,
      meta: { middleware: auth },
    },
    {
      path: "/admin/news",
      component: News,
      name: "admin.news",
      meta: { middleware: auth },
    },
    {
      path: "/admin/news/create",
      component: FormNews,
      name: "admin.news.create",
      meta: { middleware: auth },
    },
    {
      path: "/admin/news/:id/edit",
      component: FormNews,
      name: "admin.news.edit",
      meta: { middleware: auth },
      props: true,
    },
    {
      path: "/admin/settings",
      component: Settings,
      meta: { middleware: auth },
    },
  ],
};
const routes = [
  authPages,
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: Login,
        meta: { middleware: guest },
      },
      {
        path: "/auth/register",
        component: Register,
        meta: { middleware: guest },
      },
    ],
  },
  {
    path: "/landing",
    component: Landing,
    meta: { middleware: auth },
  },
  // {
  //   path: "/profile",
  //   component: Profile,
  // },
  {
    path: "/",
    component: Pages,
    children: [
      {
        path: "/",
        name: "index",
        component: Index,
      },
      {
        path: "/pricing",
        name: "pricing",
        component: Pricing,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

export default routes;
