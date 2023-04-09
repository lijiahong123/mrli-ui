<template>
  <div id="app">
    <l-button disabled @click="click">默认按钮</l-button>
    <l-button  size="medium" type="default">default按钮</l-button>
    <l-button disabled size="small" type="success">success按钮</l-button>
    <l-button disabled size="mini" type="waring">waring按钮</l-button>
    <l-button disabled type="danger">danger按钮</l-button>
    <l-button disabled type="info">info按钮</l-button>
    <l-button disabled type="text">info按钮</l-button>
  </div>
</template>

<script>
export default {
  name: "App",
  methods:{
    click(e) {
      console.log("点击",e);
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
