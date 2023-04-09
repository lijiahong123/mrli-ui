import Vue from "vue";
import App from "./App.vue";
import MrliUI  from '../package/index'

Vue.use(MrliUI )

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
