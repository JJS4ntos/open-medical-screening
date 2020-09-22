//TODO: Substituir algoritmo de machine learning por busca de palavras chaves através de regex
// /\b(\w*dor\w*)|(\w*cabeça\w*)\b/g

import { NEURAL_NETWORK } from "../config/variables";
import { getDiseaseSymptomAndPersist } from "../persist/index";
import { saveFile, loadFile, fileExist } from "../cache/index";
import _ from "lodash";
import brain from "brain.js";
import mimir from "../bag-of-words/index";

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

const getTrainData = async () => {
  const diseases = await getDiseaseSymptomAndPersist();
  const trainData = [];
  const bow = mimir.bow;
  const dict = mimir.dict;

  //for(let i = 0; i <= 10; i++) {
  filterDisease(diseases).forEach((d) => {
    const text = _.shuffle(d.symptoms).join(" ");
    trainData.push({
      input: text,
      output: [d.id],
    });
  });
  //}

  //console.log({ trainData })

  const texts = trainData.map((data) => {
    return data.input;
  });

  const vocabullary = dict(texts);

  console.log({ vocabullary });

  return trainData.map((data) => {
    return {
      input: data.input.replace(/([.,;"()“”])/g, ""),
      output: data.output,
    };
  });
};

export const trainNeuralNetwork = async () => {
  const trainData = await getTrainData();
  //console.log(JSON.stringify(trainData))
  const neuralNetwork = new brain.NeuralNetwork(
    NEURAL_NETWORK.neuralNetworkConfig
  );
  neuralNetwork.train(trainData, NEURAL_NETWORK.trainConfig);
  const knowledge = neuralNetwork.toJSON();
  saveFile(NEURAL_NETWORK.trainedFile, JSON.stringify(knowledge));
  return neuralNetwork;
};

export const loadNeuralNetwork = async () => {
  let neuralNetwork = null;
  if (!fileExist(NEURAL_NETWORK.trainedFile)) {
    neuralNetwork = await trainNeuralNetwork();
  } else {
    const knowledge = JSON.parse(loadFile(NEURAL_NETWORK.trainedFile));
    neuralNetwork = new brain.NeuralNetwork();
    neuralNetwork.fromJSON(knowledge);
  }
  return neuralNetwork;
};

export const ask = async (question) => {
  const neuralNetwork = await loadNeuralNetwork();
  const answer = JSON.stringify(neuralNetwork.run(question));
  console.log(`Question: ${question} |----| Answer: ${answer}`);
};
