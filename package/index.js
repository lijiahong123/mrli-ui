import "./access/base.scss"
import LButton from "./Button/index.js"
import LTree from "./Tree/index.js"
import LIcon from "./Icon/index.js"
import LCheckbox from "./Checkbox/index.js"

const components = [LButton, LTree, LIcon, LCheckbox]

const install = function (Vue) {
    components.forEach(component => {
        if (component.installed === false) {
            Vue.component(component.name, component)
        }
        Vue.use(component)
    })
}

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue)
}

const MrliUI = { install }

export default MrliUI
export { LButton, LTree, LIcon, LCheckbox }
