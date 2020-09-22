//TODO: Substituir algoritmo de machine learning por busca de palavras chaves através de regex
// /\b(\w*dor\w*)|(\w*cabeça\w*)\b/g
import { getDiseaseSymptomAndPersist } from "../persist/index";
import _ from "lodash";

const filterDisease = (diseases) => {
  return diseases.filter((d) => {
    const t = d.title;
    return (
      t !== "AIDS" &&
      t !== "HIV" &&
      t !== "DST" &&
      t !== "Febre do Mayaro" &&
      t !== "Febre Hemorrágica Brasileira" &&
      t !== "Guillian Barré" &&
      t !== "Hepatite B" &&
      t !== "Meningites" &&
      t !== "Paracoccidioidomicose"
    );
  });
};

export const ask = async (question) => {
  const diseases = await getDiseaseSymptomAndPersist();
  const words = question.replace(/([.,;"()“”])/g, "").split(" ");

  const regexWords = words.map((word, index) => {
    return `\\b(${word})\\b`;
  });

  console.log(`${regexWords.join("|")}/g`);

  const regex = new RegExp(`${regexWords.join("|")}`, "g");

  console.log(regex);

  const result = diseases.filter((d) => {
    const match = d.symptoms
      .join(" ")
      .replace(/([.,;"()“”])/g, "")
      .match(regex);
    return match && match.length;
  });
  console.log(`Question: ${question} |----| Answer: ${JSON.stringify(result)}`);
};
