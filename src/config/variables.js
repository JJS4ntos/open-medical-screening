export const GOV_URL = "http://www.saude.gov.br/saude-de-a-z";

export const CACHE_LOCAL = {
  path_file: "disease_cached.json",
};

export const NEURAL_NETWORK = {
  neuralNetworkConfig: {
    hiddenLayers: [10, 100],
    activation: "relu", // Supported activation types ['sigmoid', 'relu', 'leaky-relu', 'tanh']
  },
  trainConfig: {
    log: (details) => console.log(details),
  },
  trainedFile: "trained.json",
};
