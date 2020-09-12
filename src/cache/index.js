import fs from 'fs'

const categories = [
    'DISEASES_NAMES'
]

const checkIfCategoryExist = (category_name) => {
    if( !categories.includes(category_name) ) {
        throw Error('Category not found')
    }
}

const saveFile = async (category_name, file_content) => {
    checkIfCategoryExist(category_name)
    fs.writeFileSync(`${category_name}`, file_content)
}

export {
    saveFile
}