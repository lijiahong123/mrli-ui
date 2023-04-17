<template>
    <i :class="'l-icon-' + name"></i>
  </template>
  
  <script>
    export default {
      name: 'lIcon',
  
      props: {
        name: String
      }
    };
  </script>
  <style lang="scss" scoped>
  @import "../../access/icon.css";
  </style>
  