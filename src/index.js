import {
  getDiseasesAndPersist,
  getDiseaseSymptomAndPersist,
} from "./persist/index.js";

import { ask } from "./doctor/index.js";

ask("dor cabeça");

export { getDiseasesAndPersist, getDiseaseSymptomAndPersist };
