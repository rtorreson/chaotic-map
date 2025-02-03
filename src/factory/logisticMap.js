/**
 * Class representing a Logistic Map.
 */
export default class LogisticMap {
    /**
     * Creates a new instance of Logistic Map.
     */
    constructor() {
        /**
         * The initial state of the system (randomly initialized).
         * @type {number}
         */
        this.currentX = Math.random();
    }

    /**
     * Iterates the Logistic Map forward by one time step.
     * @returns {number} The updated value of the system state after iteration.
     */
    iterate() {
        /**
         * Growth rate parameter used in the logistic map equation.
         * @type {number}
         */
        const growthRate = 3.8;

        /**
         * Calculate the new value of x based on the logistic map equation.
         * @type {number}
         */
        this.currentX = growthRate * this.currentX * (1 - this.currentX);

        /**
         * Return the updated value of the system state after iteration.
         * @returns {number} The updated value of x.
         */
        return this.currentX;
    }
}
