import "core-js/stable";
import "regenerator-runtime/runtime";
import { ask } from "./doctor/index.js";
import { removeTrashWords } from "./config/trash_words.js";
import {
  getDiseasesFile,
  loadDiseaseSymptomAndPersist,
} from "./persist/index.js";

module.exports = {
  ask,
  removeTrashWords,
  getDiseasesFile,
  loadDiseaseSymptomAndPersist,
};
