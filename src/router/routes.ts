import { ROUTER_URL } from '../core/types/enums/router-url.enum';

export const routes = [
  {
    path: ROUTER_URL.HOME,
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: ROUTER_URL.USERS,
    name: 'users',
    component: () => import('../views/UsersView.vue'),
  },
  {
    path: ROUTER_URL.USER,
    name: 'user',
    component: () => import('../views/UserView.vue'),
  }
];