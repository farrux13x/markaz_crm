import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import(/* webpackChunkName: "pay" */ '../views/PayView.vue')
  },
  {
    path: '/students',
    name: 'students',
    component: () => import(/* webpackChunkName: "students" */ '../views/StudentsView.vue')
  },
  {
    path: '/group',
    name: 'group',
    component: () => import(/* webpackChunkName: "group" */ '../views/GroupView.vue')
  },
  {
    path: '/salary',
    name: 'salary',
    component: () => import(/* webpackChunkName: "salary" */ '../views/SalaryView.vue')
  },
  {
    path: '/outlay',
    name: 'outlay',
    component: () => import(/* webpackChunkName: "outlay" */ '../views/OutlayView.vue')
  },
  {
    path: '/cash',
    name: 'cash',
    component: () => import(/* webpackChunkName: "cash" */ '../views/PaymentView.vue')
  },
  {
    path: '/direction',
    name: 'direction',
    component: () => import(/* webpackChunkName: "direction" */ '../views/DirectionView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
