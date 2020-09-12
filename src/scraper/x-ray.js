import Xray from 'x-ray'

const listSelector = '.row-fluid.module.span12 .list-group-item.list-group-item-action'

const getDiseases = async (url) => {
    const x = Xray()
    let result
    try {
        result = x(url, listSelector, [
            {
                title: 'strong'
            }
        ])
    } catch (e) {
        console.error(e.message)
    }
    return result
}

export {
    getDiseases
}