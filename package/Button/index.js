import LButton from './src/button.vue'

LButton.install = Vue => {
    Vue.component(LButton.name, LButton)
    LButton.installed = true
}

export default LButton