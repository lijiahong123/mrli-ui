<template>
  <div id="app">
    <l-button @click="click">默认按钮</l-button>
    <l-button type="default">default按钮</l-button>
    <l-button type="success">success按钮</l-button>
    <l-button type="waring">waring按钮</l-button>
    <l-button type="danger">danger按钮</l-button>
    <l-button type="info">info按钮</l-button>
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
