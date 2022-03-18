import {useAuthStore} from "../store/auth";
import Cookies from "js-cookie";

export default async ({next, router}) => {
    const auth = useAuthStore();
    const {isAuthenticated, checkAuthenticated} = auth;
    // const token = Cookies.get('authToken') ?? false;
    const token = await checkAuthenticated()

    if (!token) {
        next('/auth/login');
    }
    next();
};
