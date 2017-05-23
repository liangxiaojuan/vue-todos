<template>
<!--checkedClass todo-->
  <div class="list-item  editingClass editing "  :class="{checked:checked}">
    <label class="checkbox">
      <input type="checkbox" v-model="checked" name="checked">
      <span class="checkbox-custom"></span>
    </label>
    <input type="text" value="todoteasdasdasdasxt" placeholder='asdasd' :disabled="checked">
    <a class="js-delete-item delete-item" href="#">
      <span class="icon-trash"></span>
    </a>
  </div>
</template>
<script>
export default {
  name: 'Item',
  data() {
    return {
      checked: false
    };
  }
};
</script>


<style lang="less">

@import '../common/style/list-items.less';
</style>
