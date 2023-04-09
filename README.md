# mrli-ui

一个用与 vue2.x 版本的 UI 组件库， 主要解决虚拟渲染，包括虚拟 tree, 虚拟列表， 日历等等一些常用组件，组件正在开发中...

# 安装

```bash
$ npm install @mrli-utils/ui -S
```

# 引入

## 方式一：全局引入

main.js

```js
import Vue from "vue";
import App from "./App.vue";
import MrliUI  from  from '@mrli-utils/ui';

Vue.use(MrliUI )

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

## 方式二：按需引入

main.js

```js
import Vue from "vue";
import App from "./App.vue";
import {Lbutton}  from  from '@mrli-utils/ui';

Vue.use(Lbutton)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

## 页面内使用


```html
<template>
    <div id="app">
        <l-button @click="click" type="primiry">默认按钮</l-button>
    </div>
</template>

<script>
    export default {
        name: "App",
        methods: {
            click(e) {
                console.log("点击", e)
            },
        },
    }
</script>
```
