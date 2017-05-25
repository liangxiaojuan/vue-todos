import Vue from 'vue';
import Router from 'vue-router';
import layouts from '@/components/layouts';
import login from '@/components/login';
import list from '@/components/lists';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'Hello',
      component: layouts,
      children: [{
        path: '/list/:id',
        name: 'list',
        component: list
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
});
