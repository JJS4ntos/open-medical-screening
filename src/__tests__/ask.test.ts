import { ask } from '../doctor'

describe("Ask function", () => {
    test("Should return an array at least one index", async () => {
        const diseases = await ask("manchas vermelhas");
        expect(diseases.length).toBeGreaterThanOrEqual(1);
    }) 
})