import { ask } from "./doctor/index.js";
import { removeTrashWords, trashWords } from "./config/trash_words.js";
import {
  getDiseasesFile,
  loadDiseaseSymptomAndPersist,
} from "./persist/index.js";

module.exports = {
  ask,
  removeTrashWords,
  trashWords,
  getDiseasesFile,
  loadDiseaseSymptomAndPersist,
};
