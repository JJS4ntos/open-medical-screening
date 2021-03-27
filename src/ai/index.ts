import { NeuralNetwork } from 'brain.js'
import { getDiseasesSymptoms } from '../scraper'
import { Disease } from '../doctor'
import _ from 'lodash'

interface AIData {
    input: any;
    output: any;
}

export const train = async () => {
    const net = new NeuralNetwork({
        hiddenLayers: [50, 25, 10, 1],
        activation: 'sigmoid'
    })
    const diseases = await getDiseasesSymptoms()
    const MAX_SIZE_SYMPTOM_STRING = diseases.reduce((prev, cur) => {
        return prev.symptoms.join(' ').length > cur.symptoms.join(' ').length? prev : cur
    }).symptoms.join(' ').length
    const preparedData = prepareData(diseases, 1, MAX_SIZE_SYMPTOM_STRING)
    net.train(preparedData, {
        log: true,
        logPeriod: 1,
    })
    const question = encode('manchas vermelhas', MAX_SIZE_SYMPTOM_STRING)
    const result = net.run(question)
    console.log({ result })
}

const prepareData = (diseases: Disease[], epochs: number, MAX_SIZE_SYMPTOM_STRING: number): AIData[] => {
    let result: AIData[] = [];
    for(let i = 0; i < epochs; i++) {
        const data = diseases.map(d => {
            return {
                input: encode(d.symptoms.join(' '), MAX_SIZE_SYMPTOM_STRING),
                output: { [d.title]: 1 }
            }
        });
        result = [...result, ...data];
    }
    return result;
}

const encode = (input: string, MAX_SIZE_SYMPTOM_STRING: number) => {
    const message = input.split("")
        .map(convertToCharCode);
    const diffToFill = _.fill(new Array(MAX_SIZE_SYMPTOM_STRING - message.length), 0);
    return [...message, ...diffToFill]
}

const convertToCharCode = (c: string) => Math.fround(c.charCodeAt(0) / 255).toFixed(3) as unknown as number