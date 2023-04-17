<template>
  <div id="app">
    <l-button size="mini" type="waring">waring按钮</l-button>
    <l-button type="danger" @click="changeTreeProp">改变tree属性</l-button>
    <l-tree :data="treeData" :defaultCheckedKeys="[14]" :showCheckbox="true" node-key="id" :props="treeProp"></l-tree>
    <!-- <i class="l-icon-edit"></i> -->

    <LCheckbox v-model="checked" :indeterminate="false" @change="changeCheck">北京</LCheckbox>
    <LCheckbox v-model="checked1" :indeterminate="true">上海</LCheckbox>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      treeData: [{
        id: 1,
        label: '一级 1--1',
        children: [{
          id: 4,
          label: '二级 1-1--4',
          children: [{
            id: 9,
            label: '三级 1-1-1--9'
          }, {
            id: 10,
            label: '三级 1-1-2--10'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2--2',
        children: [{
          id: 5,
          label: '二级 2-1--5'
        }, {
          id: 6,
          label: '二级 2-2--6'
        }]
      }, {
        id: 3,
        label: '一级 3--3',
        children: [{
          id: 7,
          label: '二级 3-1--7'
        }, {
          id: 8,
          label: '二级 3-2--8',
          children: [{
            id: 11,
            label: '三级 3-2-1--11'
          }, {
            id: 12,
            label: '三级 3-2-2--12',
            children:[
              {
                id:14,
                label:'四级--14'
              },
              {
                id:15,
                label:'四级--15'
              }
            ]
          }, {
            id: 13,
            label: '三级 3-2-3--13'
          }]
        }]
      }],
      treeProp: {
        label: 'label', // string | function
        children: 'children', // string
        disabled: false, // boolean | function
      },

      checked: false,
      checked1: false
    }
  },
  methods: {
    click(e) {
      console.log("点击", e);
    },
    changeCheck(val) {
      console.log(val);
    },
    changeTreeProp() {
      this.treeData[0].label = '今天星期天'
    }
  }
};
</script>

<style lang="scss">
#app {
  .l-button+.l-button {
    margin-left: 5px;
  }
}
</style>
