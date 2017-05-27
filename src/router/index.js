import Vue from 'vue';
import Router from 'vue-router';
import layouts from '@/components/layouts';
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
    }
  ]
});
