<template>
  <div class="list-todos">
    <transition-group tag="div" name="list">
      <a @click="goList(list.id)" :key="list.id" class="list-todo activeListClass list" :class="{'active': list.id === todoId}" v-for="list in todos">
        <span class="icon-lock" v-if="list.locked"></span>
        <span class="count-list" v-if="list.count > 0">{{list.count}}</span>
        {{list.title}}
      </a>
    </transition-group>
    <a class=" link-list-new" @click="addTodoList">
      <span class="icon-plus">
      </span>
      新增
    </a>
  </div>
</template>
<script>
import { addTodo } from '../api/api';
export default {
  props: ['todoList', 'id'],
  computed: {
    todos() {
      return this.todoList;
    },
    todoId() {
      return this.id;
    }
  },
  methods: {
    addTodoList() {
      addTodo({}).then(data => {
        this.$store.dispatch('getTodo').then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.goList(this.todoList[this.todoList.length - 1].id);
            }, 500);
          });
        });
      });
    },
    goList(id) {
    this.$emit('go-list', id);
    }
  }
};
</script>
<style lang="less">
@import '../common/style/menu.less';
</style>

