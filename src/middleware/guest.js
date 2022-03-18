import {useAuthStore} from "../store/auth";

export default ({next, router}) => {
    const auth = useAuthStore();
    const {isAuthenticated} = auth;

    if (isAuthenticated) {
        next('/admin/dashboard')
    }
    next()
}
