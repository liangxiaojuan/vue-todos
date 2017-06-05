import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

// 应用初始状态
const state = {
  todoList: [],
  menuOpen: false
};

// 定义所需的 mutations
const mutations = {
  EDITTODE(state, data) {
    state.todoList = data;
  },
  MENUOPEN(state) {
    state.menuOpen = !state.menuOpen;
  }
};

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
});
