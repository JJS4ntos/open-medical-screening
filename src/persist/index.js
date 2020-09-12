import { getDiseases } from '../scraper/x-ray.js'
import { saveFile } from '../cache/index.js'
import { GOV_URL } from '../config/variables.js'
import fs from 'fs'

const CATEGORY_DISEASES_NAMES = 'DISEASES_NAMES'

const fileExistAndNotEmpty = async () => {
    const fileExist = await fs.existsSync(CATEGORY_DISEASES_NAMES)
    let hasContentFile = false
    if( fileExist ) {
        const stats = await fs.statSync(CATEGORY_DISEASES_NAMES)
        hasContentFile = stats.size > 0
    }
    return fileExist && hasContentFile
}

const getDiseasesAndPersist = async () => {
    const fileExistNotEmpty = await fileExistAndNotEmpty()
    if( !fileExistNotEmpty ) {
        const diseases = await getDiseases(GOV_URL)
        saveFile(CATEGORY_DISEASES_NAMES, JSON.stringify(diseases))
    }
}

export {
    getDiseasesAndPersist
}
