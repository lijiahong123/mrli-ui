import LCheckbox from "./src/checkbox.vue"

LCheckbox.install = Vue => {
    Vue.component(LCheckbox.name, LCheckbox)
    LCheckbox.installed = true
}

export default LCheckbox
