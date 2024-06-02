import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/Auth.vue'
import CartView from '../views/Cart.vue'
import {useUserStore} from "@/stores/user";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            beforeEnter() {
                return checkAuth();
            },
        },
        {
            path: '/cart',
            name: 'cart',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: CartView,
            beforeEnter() {
                return checkAuth();
            },
        },
        {
            path: '/auth',
            name: 'auth',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: AuthView,
            beforeEnter() {
                const store = useUserStore();
                const { user } = store;
                return user?.isAuthorized ? '/' : true
            },
        }
    ]
})

function checkAuth() {
    const store = useUserStore();
    const { user } = store;
    return user?.isAuthorized ? true : '/auth';
}

export default router
