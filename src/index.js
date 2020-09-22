import {
  getDiseasesAndPersist,
  getDiseaseSymptomAndPersist,
} from "./persist/index.js";

import { ask } from "./neural-network/index.js";

ask("dor de cabeça");

export { getDiseasesAndPersist, getDiseaseSymptomAndPersist };
