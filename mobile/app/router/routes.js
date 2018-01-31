import Vue from 'nativescript-vue';
import Router from 'vue-router';

import Home from '@/components/Home/Home.vue'
import Login from '@/components/Login/Login.vue'
import Assignments from '@/components/Assignments/Assignments.vue'
import Assignment from '@/components/Assignment/Assignment.vue'

import storeConf from '@/store/store.js'


Vue.use(Router);

let router = new Router({
    pageRouting: true,
    routes: [
        {
          path: '/login',
          component: Login,
          meta: { hiddenActionBar: true }
        },
        {
          path: '/home',
          component: Home,
          meta: { requiresAuth: true }
        },
        {
          path: '/assignments/:id',
          component: Assignments,
          meta: { requiresAuth: true }
        },
        {
          path: '/assignment/:id',
          component: Assignment,
          meta: { requiresAuth: true }
        },
        { path: '*', redirect: '/login' }
      ]
});
router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !storeConf.state.user) next('auth');
  else
    next();
});

export default router;
