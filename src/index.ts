import "core-js/stable";
import "regenerator-runtime/runtime";
import { ask } from "./doctor";
import { removeTrashWords } from "./config/trash_words";
import {
  getDiseasesFile,
  loadDiseaseSymptomAndPersist,
} from "./persist";
import { train } from './ai'

train()

module.exports = {
  ask,
  removeTrashWords,
  getDiseasesFile,
  loadDiseaseSymptomAndPersist,
};
