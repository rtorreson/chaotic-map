/**
 * Class representing a Continuous Dynamical System.
 */
export default class ContinuousDynamicalSystem {
    /**
     * Creates a new instance of Continuous Dynamical System.
     */
    constructor() {
        /**
         * The current state of the system (initially set to 0).
         * @type {number}
         */
        this.currentX = 0;
    }

    /**
     * Iterates the system forward by a specified time step.
     * @param {number} delta - The time step for the iteration.
     * @returns {number} The updated value of the system state after iteration.
     */
    iterate(delta) {
        const updateX = Math.sin(this.currentX);
        this.currentX += updateX * delta;

        return updateX;
    }
}
