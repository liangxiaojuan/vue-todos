<template>
  <div id="container" class="menuOpen">
    <section id="menu">
      <!--<div class="language-toggle">-->
      <!--<span class="active" v-for="language in languages">{{language}}</span>-->
      <!--<a href="#" class="js-toggle-language" v-for="language in languages">{{language}}</a>-->
      <!--</div>-->
      <!--<div class="btns-group-vertical">
            <a href="#" class="js-user-menu btn-secondary">
              <span class="icon-arrow-up"></span>
              <span class="icon-arrow-down"></span>
              敖德萨所大所
            </a>
            <a class="js-logout btn-secondary">
            </a>
          </div>-->
      <!--<div class="btns-group">
            <a href="" class="btn-secondary">
              登录
            </a>
            <a href="" class="btn-secondary">
              注册
            </a>
          </div>-->
      <div class="list-todos">
        <a class="js-new-list link-list-new">
          <span class="icon-plus">
          </span>
          新增
        </a>
        <a href="" title="" class="list-todo activeListClass list" v-for="list in lists">
  
          <!--<span class="icon-lock"></span>-->
          <span class="count-list">{{list.count}}</span>
          {{list.name}}
        </a>
  
      </div>
    </section>
    <!--<div class="notifications">
              <div class="notification">
                <span class="icon-sync"></span>
                <div class="meta">
                  <div class="title-notification">
                    dadasdasd
                  </div>
                  <div class="description">
                    asdasdasdasd
                  </div>
                </div>
              </div>
            </div>-->
    <div class="content-overlay"></div>
    <div id="content-container">
    <list></list>
    </div>
  </div>
</template>

<script>
import list from './lists';
export default {
  data() {
    return {
      languages: ['asdas', 'asdas', 'aasdas'],
      lists: [{ name: '12312', count: 1232 }, { name: '12312', count: 1232 },
      { name: '12312', count: 1232 },
      { name: '12312', count: 1232 }],
      text: '111'
    };
  },
  components: {
    list
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
