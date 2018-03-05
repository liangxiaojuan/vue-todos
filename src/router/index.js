import Vue from 'vue';
import Router from 'vue-router';
import layouts from '@/components/layouts';
import todo from '@/components/todo';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Hello',
    component: layouts,
    children: [{
      path: '/todo/:id',
      name: 'todo',
      component: todo
    }]
  }]
});
