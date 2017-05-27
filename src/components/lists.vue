<template>
  <div class="page lists-show" v-show="!todo.isDelete">
    <nav>
      <div class="form list-edit-form" v-show="isUpdate">
        <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked">
        <div class="nav-group right">
          <a class="nav-item" @click="isUpdate = false">
            <span class="icon-close">
            </span>
          </a>
        </div>
      </div>
      <div class="nav-group" @click="$store.dispatch('updateMenu')" v-show="!isUpdate">
        <a class="nav-item">
          <span class="icon-list-unordered" title="请输入">
          </span>
        </a>
      </div>
  
      <h1 class="title-page" v-show="!isUpdate" @click="isUpdate = true">
        <span class="title-wrapper">{{todo.title}}</span>
        <span class="count-list">{{todo.count || 0}}</span>
      </h1>
  
      <div class="nav-group right" v-show="!isUpdate">
        <div class="options-web">
          <a class=" nav-item" @click="onlock">
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else>
            </span>
          </a>
          <a class=" nav-item">
            <span class="icon-trash" @click="onDelete">
            </span>
          </a>
        </div>
      </div>
  
      <div class=" form todo-new input-symbol">
        <input type="text" v-model="text" placeholder='请输入' @keyup.enter="onAdd" :disabled="todo.locked" />
        <span class="icon-add"></span>
      </div>
    </nav>
    <div class="content-scrollable list-items">
      <div v-for="(list, index) in lists">
        <item :list="list" :index="index" :id="todo.id" :init="init" :locked="todo.locked"></item>
      </div>
    </div>
  </div>
</template>

<script>
import item from './Item';
import { addRecord, getTodo, editTodo } from '../api/api';
export default {
  data() {
    return {
      lists: [],
      todo: '',
      text: '',
      isUpdate: false
    };
  },
  components: {
    item
  },
  watch: {
    '$route.params.id'() {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const ID = this.$route.params.id;
      getTodo({ id: ID }).then(res => {
        let {
          id,
          title,
          count,
          isDelete,
          locked,
          record
        } = res.data.tode;
        this.lists = record;
        this.todo = {
          id: id,
          title: title,
          count: count,
          locked: locked,
          isDelete: isDelete
        };
      });
    },
    updateTodo() {
      editTodo({
        todo: this.todo
      }).then(data => {
        this.init();
        this.$store.dispatch('getTodo');
      });
    },
    onAdd() {
      addRecord({
        id: this.todo.id, text: this.text
      }).then(data => {
        this.init();
        this.$store.dispatch('getTodo');
        this.text = '';
      });
    },
    updateTitle() {
      this.updateTodo();
      this.isUpdate = false;
    },
    onDelete() {
      this.todo.isDelete = true;
      this.updateTodo();
    },
    onlock() {
      this.todo.locked = !this.todo.locked;
      this.updateTodo();
    }
  }
};
</script>

<style lang = "less">
@import '../common/style/nav.less';
@import '../common/style/form.less';
.page.lists-show {
  .content-scrollable {
    background: @color-empty;
    top: 5em !important;
  } // Custom nav for lists-show
  nav {
    background: linear-gradient(to bottom, #d0edf5, #e1e5f0 100%);
    height: 5em;
    text-align: center;
    @media screen and (min-width: 40em) {
      text-align: left;
    }
    .title-page {
      .position(absolute, 0, 3rem, auto, 3rem);
      @media screen and (min-width: 40em) {
        left: 1rem;
        right: 6rem;
      }
      cursor: pointer;
      font-size: 1.125em; // 18px
      white-space: nowrap;
      .title-wrapper {
        .ellipsized;
        color: @color-ancillary;
        display: inline-block;
        padding-right: 1.5rem;
        vertical-align: top;
        max-width: 100%;
      }
      .count-list {
        background: @color-primary;
        border-radius: 1em;
        color: @color-empty;
        display: inline-block;
        font-size: .7rem;
        line-height: 1;
        margin-left: -1.25rem;
        margin-top: -4px;
        padding: .3em .5em;
        vertical-align: middle;
      }
    }
    .form.todo-new {
      .position(absolute, 3em, 0, auto, 0);

      input[type="text"] {
        background: transparent;
        padding-bottom: .25em;
        padding-left: 44px !important;
        padding-top: .25em;
      }
    }
    .form.list-edit-form {
      position: relative;

      input[type="text"] {
        background: transparent;
        font-size: 1.125em; // 18px
        width: 100%;
        padding-right: 3em;
        padding-left: 1rem;
      }
    }

    select.list-edit {
      .font-s2;
      .position(absolute, 0, 0, 0, 0);
      background: transparent;
      opacity: 0; // allows the cog to appear
    }

    .options-web {
      display: none;

      .nav-item {
        .font-s3;
        width: 2rem;

        &:last-child {
          margin-right: .5rem;
        }
      }
    } // Hide & show options and nav icons
    @media screen and (min-width: 40em) {
      .nav-group:not(.right) {
        display: none !important;
      }
      .options-mobile {
        display: none;
      }
      .options-web {
        display: block;
      }
    }
  }
}
</style>
