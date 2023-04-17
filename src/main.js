import Vue from "vue"
import App from "./App.vue"
import MrliUI from "../package/index"

// import MrliUI  from '@mrli-utils/ui';
// import {LButton}  from '@mrli-utils/ui';
// import "@mrli-utils/ui/dist/lib/mrli-ui.css"

Vue.use(MrliUI)
// Vue.use(LButton)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount("#app")
