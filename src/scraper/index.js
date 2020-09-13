import Xray from "x-ray";
import { loadDiseasesNamesFile } from "../persist/index.js";
import { symptoms } from "../templates/disease_template.js";
import { generateSelector } from "../templates/index.js";

const listDiseaseSelector =
  ".row-fluid.module.span12 .list-group-item.list-group-item-action";
const x = Xray();

const getDiseases = async (url) => {
  let result;
  try {
    result = x(url, listDiseaseSelector, [
      {
        title: "strong",
        url: "@href",
      },
    ]);
  } catch (e) {
    console.error(e.message);
  }
  return result;
};

const getDiseasesSymptoms = async () => {
  const diseases = loadDiseasesNamesFile();
  const data = [];
  if (diseases) {
    for (let disease of diseases) {
      const selector = generateSelector(symptoms);
      const symptoms_result = await x(disease.url.trim(), `${selector}`, [
        {
          items: "li",
        },
      ]);
      console.log(`${JSON.stringify(symptoms_result)} - Link fundando`);
      data.push({
        name: disease.title,
        symptoms,
      });
    }
  }
  return data;
};

export { getDiseases, getDiseasesSymptoms };
