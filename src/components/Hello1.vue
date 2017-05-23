<template>
  <div class="app" id="app">
    <form class="form" v-on:submit="addTodo">
      <input class="input form__input" v-model="inputVal" />
      <button class="btn form__submit-btn" type="submit">添加</button>
    </form>
    <transition-group tag="ol" name="list" class="todo-list">
      <li class="todo-list__item" v-bind:class="{ complete: todo.complete }" v-bind:key="index" v-for="(todo, index) in filteredTodos">
        <button class="todo-list__item-content" v-on:click="toggleTodo(todo)">
          {{ todo.text }}
        </button>
        <button class="btn todo-list__item-remove" v-on:click="deleteTodo(index)">
          <i class="fa" v-bind:class="[todo.complete ? 'fa-check' : 'fa-times']"></i>
        </button>
      </li>
    </transition-group>
    <div class="filters">
      <button class="btn filters__btn filters__btn--all" v-on:click="filterTodos('all')">
        All
      </button>
      <button class="btn filters__btn filters__btn--complete" v-on:click="filterTodos('complete')">
        Complete
      </button>
      <button class="btn filters__btn filters__btn--incomplete" v-on:click="filterTodos('incomplete')">
        Incomplete
      </button>
    </div>
  </div>
</template>

<script>
// var filters = {
//   all: function (todos) {
//     return todos;
//   },
//   complete: function (todos) {
//     return todos.filter(function (todo) {
//       return todo.complete;
//     });
//   },
//   incomplete: function (todos) {
//     return todos.filter(function (todo) {
//       return !todo.complete;
//     });
//   }
// };

// var STORAGE_KEY = 'vue-js-todo-P7oZi9sL';
// var todoStorage = {
//   fetch: function () {
//     var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
//     return todos;
//   },
//   save: function (todos) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
//   }
// };
export default {
  data: {
    inputVal: '',
    todos: [{
      text: 'aaa'
    },
    {
      text: 'aaa'
    },
    {
      text: 'aaa'
    }],
    visibility: 'all'
  },
  watch: {
    todos: {
      handler: function (todos) {
        // todoStorage.save(todos);
      }
    }
  },
  computed: {
    filteredTodos: function () {
      return this.todos;
      // return filters[this.visibility](this.todos);
    }
  },
  methods: {
    addTodo: function (e) {
      e.preventDefault();
      if (this.inputVal) {
        this.todos.push({
          text: this.inputVal,
          complete: false
        });
      }
      this.inputVal = '';
    },
    toggleTodo: function (todo) {
      todo.complete = !todo.complete;
    },
    filterTodos: function (filter) {
      this.visibility = filter;
    },
    deleteTodo: function (index) {
      this.todos.splice(index, 1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$color-main: #4fc08d;

$font-family: 'Source Sans Pro',
sans-serif;

*,
*:before,
*:after {
  box-sizing: border-box;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "liga", "kern";
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  background: linear-gradient(210deg, lighten($color-main, 20%), $color-main);
}

body {
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-family;
}

button {
  background: none;
  border: none;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
}

.app {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 1em;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(25, 25, 25, .25);
}

.btn {
  font-size: 14px;
  margin: 0 .5em;
  border-radius: 2em;
  padding: 0.75em 1.5em;
  cursor: pointer;
  background: none;
  color: darken($color-main, 20%);
  border: 1px solid;
  letter-spacing: 1px;
  font-family: $font-family;
  color: #4fc08d;
  border: $color-main 1px solid;
  transition: 250ms ease-out;
  &:hover,
  &:focus {
    color: #fff;
    background: $color-main;
  }
}

.form {
  width: 100%;
  padding: 1.5rem 1rem 0 1rem;
  display: flex;
  &__input {
    width: 100%;
    font-size: 14px;
    margin: 0 .5em;
    border-radius: 2em;
    padding: 0.75em 1.5em;
    background: none;
    font-family: $font-family;
    border: #e3e3e3 1px solid;
    transition: border 250ms ease-out;
    &:focus {
      border: $color-main 1px solid;
      outline: none;
    }
  }
  &__input,
  &__submit-btn {}
}

.todo-list {
  $block: #{&};
  width: 100%;
  padding: 0 1rem;
  flex: 1;
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5em;
    margin-bottom: .5em;
    border-radius: 3px;
    transition: 200ms;
    color: $color-main;
    &:last-child {
      margin-bottom: 0;
    }
    &.complete {
      color: lightgreen;
      #{$block}__item-content {
        &:after {
          background: lightgreen;
        }
      }
    }
  }
  &__item-content {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      height: 1px;
      background: $color-main;
      transition: 250ms ease-out;
      transform-origin: center;
      transform: scalex(0);
    }
    &:hover,
    &:focus {
      &:after {
        transform: scalex(1);
      }
    }
  }
  &__item-remove {
    margin-left: .5em;
    background: none;
    border: 1px solid;
    color: inherit;
    padding: 0;
    line-height: 1;
    width: 2em;
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 80%;
  }
}

.filters {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0 1rem 1.5rem 1rem;
}

.list-move,
.list-leave-active,
.list-enter-active,
{
  transition: 500ms cubic-bezier(.87, -.41, .19, 1.44);
}

.list-enter,
.list-leave-active {
  transform: translate(100%, 0);
  opacity: 0;
}
</style>
