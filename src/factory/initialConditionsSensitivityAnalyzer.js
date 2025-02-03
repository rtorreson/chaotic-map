/**
 * Class for analyzing sensitivity to initial conditions of chaotic maps.
 */
export default class InitialConditionsSensitivityAnalyzer {
    /**
     * Creates a new instance of InitialConditionsSensitivityAnalyzer.
     * @param {Object} map - An object representing a chaotic map with setState() and iterate() methods.
     */
    constructor(map) {
        this.map = map;
    }

    /**
     * Analyzes the sensitivity to initial conditions of the chaotic map.
     * @param {number} initialX1 - The first initial condition.
     * @param {number} initialX2 - The second initial condition.
     * @param {number} numIterations - The number of iterations to analyze.
     * @returns {number} The maximum difference between states resulting from different initial conditions.
     */
    analyze(initialX1, initialX2, numIterations) {
        this.map.setState(initialX1);
        const states1 = [];

        for (let i = 0; i < numIterations; i++) {
            this.map.iterate();
            states1.push(this.map.getState());
        }

        this.map.setState(initialX2);
        const states2 = [];

        for (let i = 0; i < numIterations; i++) {
            this.map.iterate();
            states2.push(this.map.getState());
        }

        const differences = states1.map((state1, index) => Math.abs(state1 - states2[index]));
        const maxDifference = Math.max(...differences);
        return maxDifference;
    }
}
