<template>
  <!--checkedClass todo-->
  <div class="list-item  editingClass editing " :class="{checked: item.checked}" v-show="!item.isDelete">
    <label class="checkbox">
      <input type="checkbox" v-model="item.checked" name="checked" @change="checkboxChange" :disabled="locked">
      <span class="checkbox-custom"></span>
    </label>
    <input type="text" :value="item.text" placeholder='写点什么。。。' :disabled=" item.checked || locked" @change="checkboxChange">
    <a class="js-delete-item delete-item" v-if="item.checked && !locked" @click="item.isDelete = true;checkboxChange()">
      <span class="icon-trash"></span>
    </a>
  </div>
</template>
<script>
import { editRecord } from '../api/api';
export default {
  props: ['list', 'index', 'id', 'init', 'locked'],
    name: 'Item',
    data() {
      return {
      };
    },
    computed: {
      item() {
        return this.list;
      }
    },
    methods: {
      checkboxChange() {
        editRecord({
          id: this.id, record: this.item, index: this.index
        }).then(data => {
          this.init();
        });
      }
    }
};
</script>


<style lang="less">
@import '../common/style/list-items.less';
</style>
