import { getDiseases, getDiseasesSymptoms } from "../scraper";
import { saveFile } from "../cache";
import { GOV_URL, CACHE_LOCAL } from "../config/variables";
import fs from "fs";
import { Disease, SimpleDisease } from "../doctor";

const fileExistAndNotEmpty = async (fileName: string) => {
  const fileExist = await fs.existsSync(fileName);
  return fileExist;
};

const getDiseasesFile = async () => {
  const fileLoaded = fs.readFileSync(CACHE_LOCAL.path_file, "utf8");
  const fileObject = JSON.parse(fileLoaded);
  return fileObject;
};

const loadDiseasesAndPersist = async () => {
  const fileExistNotEmpty = await fileExistAndNotEmpty(CACHE_LOCAL.path_file);
  if (!fileExistNotEmpty) {
    let diseases = await getDiseases(GOV_URL);
    diseases.map((d: Disease, index: number) => {
      return {
        id: index,
        ...d,
      };
    });
    saveFile(
      CACHE_LOCAL.path_file,
      JSON.stringify({ diseases, symptomsLoaded: false })
    );
  }
};

const persistSymptoms = async () => {
  const { diseases, symptomsLoaded } = await getDiseasesFile();
  if (symptomsLoaded) {
    return diseases;
  } else {
    let symptoms = await getDiseasesSymptoms();
    symptoms = symptoms
      .map((s: any) => {
        const disease = diseases.find((d: SimpleDisease) => d.title === s.title);
        if (disease) {
          return {
            ...s,
            url: disease ? disease.url : "",
          };
        }
        return false;
      })
      .filter((s: any) => s);
    saveFile(
      CACHE_LOCAL.path_file,
      JSON.stringify({ diseases: symptoms, symptomsLoaded: true })
    );
    return symptoms;
  }
};

const loadDiseaseSymptomAndPersist = async () => {
  await loadDiseasesAndPersist();
  return persistSymptoms();
};

export {
  loadDiseasesAndPersist,
  getDiseasesFile,
  loadDiseaseSymptomAndPersist,
};
