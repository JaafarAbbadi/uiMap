import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/',
    component: () => import('../views/home/HomePage.vue')
  },
  
  /*ROUTES*/
                { 
                    path: '/categorys',
                    component: () => import('../views/categorys/CategorysPage.vue')
                },
                { 
                    path: '/categorys/:id',
                    component: () => import('../views/categorys/CategoryPage.vue')
                }
                ,
                { 
                    path: '/users',
                    component: () => import('../views/users/UsersPage.vue')
                },
                { 
                    path: '/users/:id',
                    component: () => import('../views/users/UserPage.vue')
                }
                ,
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
