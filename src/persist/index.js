import { getDiseases, getDiseasesSymptoms } from "../scraper/index.js";
import { saveFile } from "../cache/index.js";
import { GOV_URL } from "../config/variables.js";
import fs from "fs";
import { CACHE_LOCAL } from "../config/variables.js";

const fileExistAndNotEmpty = async (fileName) => {
  const fileExist = await fs.existsSync(fileName);
  let hasContentFile = false;
  let object = [];
  if (fileExist) {
    const stats = await fs.statSync(fileName);
    hasContentFile = stats.size > 0;
    object = JSON.parse(fs.readFileSync(fileName, "utf8"));
  }
  return fileExist && hasContentFile && object.length > 0;
};

const getDiseasesFile = async () => {
  const fileLoaded = fs.readFileSync(CACHE_LOCAL.path_file, "utf8");
  const fileObject = JSON.parse(fileLoaded);
  return fileObject;
};

const getDiseasesAndPersist = async () => {
  const fileExistNotEmpty = await fileExistAndNotEmpty(CACHE_LOCAL.path_file);
  if (!fileExistNotEmpty) {
    const diseases = await getDiseases(GOV_URL);
    saveFile(CACHE_LOCAL.path_file, JSON.stringify(diseases));
  }
};

const persistSymptoms = async () => {
  const diseases = await getDiseasesFile();
  let symptoms = await getDiseasesSymptoms();
  symptoms = symptoms.map((s) => {
    const disease = diseases.find((d) => d.title === s.title);
    return {
      ...s,
      url: disease ? disease.url : "",
    };
  });
  saveFile(CACHE_LOCAL.path_file, JSON.stringify(symptoms));
};

const getDiseaseSymptomAndPersist = async () => {
  await getDiseasesAndPersist();
  persistSymptoms();
};

export { getDiseasesAndPersist, getDiseasesFile, getDiseaseSymptomAndPersist };
