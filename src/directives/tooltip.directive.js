export default {
    bind(element, {value}) {
        M.Tooltip.init(element, {html: value}) // M. materializecss
    },
    unbind(element) { // чистим html от tooltip'ов
        const tooltip = M.Tooltip.getInstance(element)

        if(tooltip && tooltip.destroy) {
            tooltip.destroy()
        }
    }
}
