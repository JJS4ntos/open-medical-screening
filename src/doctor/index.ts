import { loadDiseaseSymptomAndPersist } from "../persist";
import { removeTrashWords } from "../config/trash_words";
import _ from "lodash";

export interface SimpleDisease {
  title: string;
}

export interface Disease {
  title: string;
  symptoms: string[];
  match_count: number;
  match_words: string[];
}

const filterDisease = (diseases: SimpleDisease[]) => {
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

const detectDisease = (cleanQuestion = "", diseases: Disease[]) => {
  const words = cleanQuestion.replace(/([.,;"()“”])/g, "").split(" ");
  const regexWords = words.map((word, index) => {
    return `\\b(${word})\\b`;
  });

  //console.log(`${regexWords.join("|")}/g`);

  const regex = new RegExp(`${regexWords.join("|")}`, "gi");

  //console.log(regex);

  const matches: Disease[] = [];

  diseases.forEach(d => {
    const words_match = d.symptoms
      .join(" ")
      .replace(/([.,;"()“”])/g, "") // ponto crítico da aplicação, onde a decisão é tomada
      .match(regex);
    if (words_match && words_match.length > 0) {
      const match = _.uniq(words_match);
      matches.push({
        title: d.title,
        symptoms: d.symptoms,
        match_count: match.length,
        match_words: match,
      });
    }
  });

  return _.orderBy(matches, ["match_count"], ["desc"]);
};

export const ask = async (question: string) => {
  const lowerQuestion = question.toLowerCase();
  let diseases = await loadDiseaseSymptomAndPersist();
  const cleanQuestion = removeTrashWords(lowerQuestion);
  diseases = filterDisease(diseases);
  return detectDisease(cleanQuestion, diseases);
};
