/**
 * Class representing a Discrete Dynamical System.
 */
export default class DiscreteDynamicalSystem {
    /**
     * Creates a new instance of Discrete Dynamical System.
     */
    constructor() {
        /**
         * The initial state of the system (randomly initialized).
         * @type {number}
         */
        this.currentX = Math.random();
    }

    /**
     * Iterates the system forward by one time step.
     * @returns {number} The updated value of the system state after iteration.
     */
    iterate() {
        this.currentX = Math.sin(this.currentX);

        return this.currentX;
    }
}
