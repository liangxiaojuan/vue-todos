<template>
  <div id="container" :class="{'menu-open': menuOpen}">
    <section id="menu">
      <div class="list-todos">
        <a class=" link-list-new">
          <span class="icon-plus">
          </span>
          新增
        </a>
        <a @click="goList(list.id)" class="list-todo activeListClass list" :class="{'active': list.id === todoId}" v-for="list in todoList">
          <span class="icon-lock" v-if="list.locked"></span>
          <span class="count-list" v-if="list.count > 0">{{list.count}}</span>
          {{list.title}}
        </a>
      </div>
    </section>
    <div class="content-overlay" @click="$store.dispatch('updateMenu')"></div>
    <div id="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import list from './lists';
// import { getTodoList } from '../api/api';
export default {
  data() {
    return {
      languages: ['asdas', 'asdas', 'aasdas'],
      lists: [],
      text: '111',
      todoId: ''
    };
  },
  created() {
    // getTodoList().then(res => {
    //   console.log(res.data.todos);
    //   this.lists = res.data.todos;
    //   this.goList(this.lists[0].id);
    // });
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
    list
  },
  methods: {
    goList(id) {
      this.todoId = id;
      this.$router.push({ name: 'list', params: { id: this.todoId } });
    }
  }
};
</script>

<style lang="less">
// @import '../common/style/utils.less';
@import '../common/style/menu.less';
@import '../common/style/notification.less';
@menu-width: 270px;
@column: 5.55555%;

body {
  .position(absolute, 0, 0, 0, 0);
  background-color: #315481;
  background-image: linear-gradient(to bottom, #315481, #918e82 100%);
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#container {
  .position(absolute, 0, 0, 0, 0);

  @media screen and (min-width: 60em) {
    left: @column;
    right: @column;
  }

  @media screen and (min-width: 80em) {
    left: 2*@column;
    right: 2*@column;
  } // Hide anything offscreen
  overflow: hidden;
}

#menu {
  .position(absolute, 0, 0, 0, 0, @menu-width);
  background-color: #315481;
  background-image: linear-gradient(to bottom, #315481, #918e82 100%);
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#content-container {
  .position(absolute, 0, 0, 0, 0);
  transition: all 200ms ease-out;
  transform: translate3d(0, 0, 0);
  background: @color-tertiary;
  opacity: 1;

  .page {
    .position(absolute, 0, 0, 0, 0);
  }

  @media screen and (min-width: 40em) {
    left: @menu-width;
  }

  .content-scrollable {
    .position(absolute, 0, 0, 0, 0);
    transform: translate3d(0, 0, 0);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  } // Toggle menu on mobile
  .menu-open & {
    transform: translate3d(@menu-width, 0, 0);
    opacity: .85;
    left: 0;

    @media screen and (min-width: 40em) {
      // Show menu on desktop, negate .menu-open
      transform: translate3d(0, 0, 0); //reset transform and use position properties instead
      opacity: 1;
      left: @menu-width;
    }
  }
}

// Transparent screen to prevent interactions on content when menu is open
.content-overlay {
  .position(absolute, 0, 0, 0, 0);
  cursor: pointer;

  .menu-open & {
    transform: translate3d(@menu-width, 0, 0);
    z-index: 1;
  } // Hide overlay on desktop
  @media screen and (min-width: 40em) {
    display: none;
  }
}
</style>
