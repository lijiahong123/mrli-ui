import LIcon from './src/icon.vue'

LIcon.install = Vue =>{
    Vue.component(LIcon.name, LIcon)
    LIcon.installed = true
}

export default LIcon