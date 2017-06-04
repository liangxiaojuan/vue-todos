<template>
  <section class="container" :class="{'menu-open': menuOpen}">
    <section class="menu">
      <menus :todoList="todoList" :id="todoId" @go-list="goList"></menus>
    </section>
    <div class="content-overlay" @click="$store.dispatch('updateMenu')"></div>
    <div class="content-container">
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import menus from './menus.vue';
export default {
  data() {
    return {
      todoId: ''
    };
  },
  created() {
    this.$store.dispatch('getTodo').then(() => {
      this.$nextTick(() => {
        this.goList(this.todoList[0].id);
      });
    });
  },
  computed: {
    todoList() {
      return this.$store.getters.getTodoList;
    },
    menuOpen() {
      return this.$store.state.menuOpen;
    }
  },
  components: {
    menus
  },
  methods: {
    goList(id) {
      this.todoId = id;
      this.$router.push({ name: 'todo', params: { id: this.todoId } });
    }
  }
};
</script>

<style lang="less">
@import '../common/style/layouts.less';
</style>
