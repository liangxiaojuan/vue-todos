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
          <span class="icon-list-unordered" >
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
@import '../common/style/todo.less';
</style>
