<template>
  <!--checkedClass todo-->
  <div class="list-item  editingClass editing " :class="{checked: item.checked}">
    <label class="checkbox">
      <input type="checkbox" v-model="item.checked" name="checked" @input="aa">
      <span class="checkbox-custom"></span>
    </label>
    <input type="text" :value="item.text" placeholder='写点什么。。。' :disabled=" item.checked">
    <a class="js-delete-item delete-item" v-if="item.checked">
      <span class="icon-trash"></span>
    </a>
  </div>
</template>
<script>
export default {
  props: ['list'],
  name: 'Item',
  data() {
    return {
      checked: false
    };
  },
  computed: {
    item() {
      return this.list;
    }
  },
  methods: {
    aa() {
      console.log(1);
    }
  }
};
</script>


<style lang="less">
@import '../common/style/list-items.less';
</style>
