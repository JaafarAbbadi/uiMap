import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  /*ROUTES*/
                { 
                    path: '/users',
                    component: () => import('../views/users/UsersPage.vue')
                },
                { 
                    path: '/users/:id',
                    component: () => import('../views/users/UserPage.vue')
                }
                ,

  
  {
    path: '',
    redirect: '/folder/Inbox'
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
