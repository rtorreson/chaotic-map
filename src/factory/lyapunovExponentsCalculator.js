/**
 * Class for calculating Lyapunov exponents of chaotic maps.
 */
export default class LyapunovExponentsCalculator {
    /**
     * Creates a new instance of LyapunovExponentsCalculator.
     * @param {Object} map - An object representing a chaotic map with iterate() and iterateFunctionDerivative() methods.
     */
    constructor(map) {
        this.map = map;
    }

    /**
     * Calculates the Lyapunov exponent of the chaotic map over a specified number of iterations.
     * @param {number} numIterations - The number of iterations to use for the calculation.
     * @returns {number} The Lyapunov exponent value.
     */
    calculate(numIterations) {
        let lambda = 0;
        let x = this.map.getState(); // Initial state

        for (let i = 0; i < numIterations; i++) {
            const oldX = { ...x };
            x = this.map.iterate(); // Iterate to obtain the next state
            lambda += Math.log(Math.abs(this.map.iterateFunctionDerivative(oldX)));
        }

        lambda /= numIterations;
        return lambda;
    }
}
