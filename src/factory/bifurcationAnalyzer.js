/**
 * Class for analyzing bifurcation of chaotic maps.
 */
export default class BifurcationAnalyzer {
    /**
     * Creates a new instance of BifurcationAnalyzer.
     * @param {Object} map - An object representing a chaotic map with setParameter(), randomizeState(), and iterate() methods.
     */
    constructor(map) {
        this.map = map;
    }

    /**
     * Analyzes the bifurcation behavior of the chaotic map for different parameter values.
     * @param {Array<number>} parameterValues - An array of parameter values to analyze.
     * @returns {Array<Object>} An array of objects containing parameter and corresponding state values.
     */
    analyze(parameterValues) {
        const bifurcationData = [];

        for (const param of parameterValues) {
            this.map.setParameter(param);
            this.map.randomizeState();

            for (let i = 0; i < 1000; i++) {
                this.map.iterate();
            }

            const transientIterations = 100;
            const values = [];

            for (let i = 0; i < transientIterations; i++) {
                this.map.iterate();
                values.push(this.map.getState());
            }

            bifurcationData.push({ parameter: param, values: values });
        }

        return bifurcationData;
    }
}
