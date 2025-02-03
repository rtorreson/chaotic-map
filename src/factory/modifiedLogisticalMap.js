/**
 * Class representing a Modified Logistic Map.
 */
export default class ModifiedLogisticMap {
    /**
     * Creates a new instance of Modified Logistic Map.
     * @param {number} growthRate - The growth rate parameter for the logistic map (default: 3.8).
     */
    constructor(growthRate = 3.8) {
        /**
         * The growth rate parameter for the logistic map.
         * @type {number}
         */
        this.growthRate = growthRate;
    }

    /**
     * Iterates the Modified Logistic Map equation with the given input.
     * @param {number} x - The input value for the logistic map equation.
     * @returns {number} The output value after applying the logistic map iteration.
     */
    iterate(x) {
        /**
         * Calculate the new value of x based on the logistic map equation.
         * @type {number}
         */
        const result = this.growthRate * x * (1 - x);

        /**
         * Return the result of the logistic map iteration.
         * @returns {number} The output value after applying the logistic map iteration.
         */
        return result;
    }
}
