<template>
  <div class="page lists-show">
    <nav class="js-title-nav">
      <!--<form class="js-edit-form list-edit-form">
                                                        <input type="text" name="name" value="">
                                                        <div class="nav-group right">
                                                        <a href="#" class="js-cancel nav-item">
                                                          <span class="icon-close js-cancel" title="dsd">
                                                          </span>
                                                        </a>
                                                        </div>
                                                        </form>-->
      <div class="nav-group">
        <a href="#" class="js-menu nav-item">
          <span class="icon-list-unordered" title="请输入">
          </span>
        </a>
      </div>
  
      <h1 class="js-edit-list title-page">
        <span class="title-wrapper">{{todo.title}}</span>
        <span class="count-list">{{todo.count}}</span>
      </h1>
  
      <div class="nav-group right">
        <!--<div class="nav-item options-mobile">
                            <select class="list-edit">
                              <option disabled selected>
                                asdasdasds
                              </option>
                              <option value="public">dsds</option>
                              <option value="private">sadsad</option>
                              <option value="delete">asdasd</option>
                            </select>
                            <span class="icon-cog"></span>
                          </div>-->
        <div class="options-web">
          <a class="js-toggle-list-privacy nav-item">
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else>
            </span>
          </a>
          <a class="js-delete-list nav-item">
            <span class="icon-trash">
            </span>
          </a>
        </div>
      </div>
  
      <form class="todo-new input-symbol">
        <input type="text" v-model="text" placeholder='请输入' @keyup.enter="onAdd" />
        <span class="icon-add js-todo-add"></span>
      </form>
    </nav>
    <div class="content-scrollable list-items">
      <item :list="list" v-for="list in lists"></item>
<!--<div class="wrapper-message">
<div class="title-message">sdsd</div>
<div class="subtitle-message">dsdss</div>
</div>-->

<!--<div class="wrapper-message">
<div class="title-message">{{_ 'lists.show.loading'}}</div>
</div>-->
    </div>
  </div>
</template>

<script>
import item from './Item';
import { addLocked, getTodo } from '../api/api';
export default {
  data() {
    return {
      languages: ['asdas', 'asdas', 'aasdas'],
      lists: [],
      todo: '111',
      text: ''
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
            console.log(res.data);
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
    onAdd() {
      addLocked({
        id: this.todo.id, text: this.text
      }).then(data => {
        this.init();
        this.text = '';
      });
    }
  }
};
</script>

<style lang = "less">
@import '../common/style/utils.less';
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
    form.todo-new {
      .position(absolute, 3em, 0, auto, 0);

      input[type="text"] {
        background: transparent;
        padding-bottom: .25em;
        padding-left: 44px !important;
        padding-top: .25em;
      }
    }
    form.list-edit-form {
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
