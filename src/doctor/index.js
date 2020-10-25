//TODO: Substituir algoritmo de machine learning por busca de palavras chaves através de regex
// /\b(\w*dor\w*)|(\w*cabeça\w*)\b/g
import { getDiseaseSymptomAndPersist } from "../persist/index";
import { removeTrashWords } from "../config/trash_words.js";
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

const detectDisease = (cleanQuestion = "", diseases) => {
  const words = cleanQuestion.replace(/([.,;"()“”])/g, "").split(" ");
  const regexWords = words.map((word, index) => {
    return `\\b(${word})\\b`;
  });

  //console.log(`${regexWords.join("|")}/g`);

  const regex = new RegExp(`${regexWords.join("|")}`, "g");

  //console.log(regex);

  const matches = [];

  diseases.forEach((d) => {
    const match = d.symptoms
      .join(" ")
      .replace(/([.,;"()“”])/g, "") // ponto crítico da aplicação, onde a decisão é tomada
      .match(regex);
    if (match && match.length > 0) {
      matches.push({
        disease_name: d.title,
        match_count: match.length,
      });
    }
  });

  return _.orderBy(matches, ["match_count"], ["desc"]);
};

export const ask = async (question) => {
  let diseases = await getDiseaseSymptomAndPersist();
  const cleanQuestion = removeTrashWords(question);
  diseases = filterDisease(diseases);
  const result = detectDisease(cleanQuestion, diseases);
  console.log(
    `Question: ${question}\n Clean Question: ${cleanQuestion}\n |----| Answer: ${JSON.stringify(
      result
    )}`
  );
};
