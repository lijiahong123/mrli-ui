import LTree from './src/tree.vue'

LTree.install = Vue =>{
    Vue.component(LTree.name, LTree)
    LTree.installed = true
}

export default LTree