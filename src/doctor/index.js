import { loadDiseaseSymptomAndPersist } from "../persist/index.js";
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
    const words_match = d.symptoms
      .join(" ")
      .replace(/([.,;"()“”])/g, "") // ponto crítico da aplicação, onde a decisão é tomada
      .match(regex);
    if (words_match && words_match.length > 0) {
      const match = _.uniq(words_match);
      matches.push({
        disease_name: d.title,
        symptoms: d.symptoms,
        match_count: match.length,
        match_words: match,
      });
    }
  });

  return _.orderBy(matches, ["match_count"], ["desc"]);
};

export const ask = async (question) => {
  let diseases = await loadDiseaseSymptomAndPersist();
  const cleanQuestion = removeTrashWords(question);
  diseases = filterDisease(diseases);
  return detectDisease(cleanQuestion, diseases);
};
