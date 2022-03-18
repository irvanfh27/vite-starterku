import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import routes from "./routes";
import Cookies from "js-cookie";
import http from "@/plugins/axios";

// configure router
const router = createRouter({
  history: createWebHistory(),
  routes, // short for routes: routes
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}
router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];
    const context = { from, next, to, router };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

// router.beforeEach((to, from, next) => {

// if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (auth.isAuthenticated) {
//         next();
//     } else {
//         next("/auth/login");
//     }
// } else if (to.matched.some((record) => record.meta.guest)) {
//     if (!auth.isAuthenticated) {
//         next();
//     } else {
//         next("/admin/dashboard");
//     }
// } else {
//     next();
// }
// });

export default router;
