import { getDiseases } from "../scraper/index.js";
import { saveFile } from "../cache/index.js";
import { GOV_URL } from "../config/variables.js";
import fs from "fs";
import { CACHE_LOCAL } from "../config/variables.js";

const CATEGORY_DISEASES_NAMES = "DISEASES_NAMES";

const fileExistAndNotEmpty = async () => {
  const fileExist = await fs.existsSync(CATEGORY_DISEASES_NAMES);
  let hasContentFile = false;
  if (fileExist) {
    const stats = await fs.statSync(CATEGORY_DISEASES_NAMES);
    hasContentFile = stats.size > 0;
  }
  return fileExist && hasContentFile;
};

const loadDiseasesNamesFile = () => {
  const fileLoaded = fs.readFileSync(CACHE_LOCAL.diseasesNames, "utf8");
  const fileObject = JSON.parse(fileLoaded);
  return fileObject;
};

const getDiseasesAndPersist = async () => {
  const fileExistNotEmpty = await fileExistAndNotEmpty();
  if (!fileExistNotEmpty) {
    const diseases = await getDiseases(GOV_URL);
    saveFile(CATEGORY_DISEASES_NAMES, JSON.stringify(diseases));
  }
};

export { getDiseasesAndPersist, loadDiseasesNamesFile };
