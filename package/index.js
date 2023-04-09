import "./access/base.scss";
import LButton from "./Button/index.js"

const components = [LButton]

const install = function (Vue) {
    components.forEach(component => {
        Vue.use(component)
    })
}

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue)
}

const MrliUI = { install }

export default MrliUI 
export { LButton }
