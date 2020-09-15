import Xray from "x-ray";
import { getDiseasesFile } from "../persist/index.js";
import { symptoms } from "../templates/disease_template.js";
import { generateSelector } from "../templates/index.js";
import chalk from "chalk";

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
    console.error(chalk.red(`Erro ao buscar lista de doenças: ${e.message}`));
  }
  return result;
};

const getDiseasesSymptoms = async () => {
  const diseases = await getDiseasesFile();
  const data = [];
  if (diseases) {
    for (let disease of diseases) {
      const selector = generateSelector(symptoms);
      try {
        const symptoms_result = await x(disease.url.trim(), `${selector}`);
        if (symptoms_result.length > 0) {
          data.push({
            title: disease.title,
            symptoms: symptoms_result.split("\n").filter((s) => s.length > 0),
          });
        }
      } catch (e) {
        console.error(chalk.red(`Erro na requisição para: ${disease.url}`));
      }
    }
  }
  return data;
};

export { getDiseases, getDiseasesSymptoms };
