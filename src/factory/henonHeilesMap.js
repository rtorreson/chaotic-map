/**
 * Class representing a Henon-Heiles Map.
 */
export default class HenonHeilesMap {
    /**
     * Creates a new instance of Henon-Heiles Map.
     */
    constructor() {
        /**
         * The initial state of the system for the variable x.
         * @type {number}
         */
        this.currentX = Math.random();

        /**
         * The initial state of the system for the variable y.
         * @type {number}
         */
        this.currentY = Math.random();
    }

    /**
     * Iterates the Henon-Heiles Map forward by one time step.
     * @returns {Object} An object containing the updated values of x and y.
     */
    iterate() {
        const target = 1.4;
        const weight = 0.3;
        const updateX = this.currentY + 1 - target * this.currentX * this.currentX;
        const updateY = weight * this.currentX;

        this.currentX = updateX;
        this.currentY = updateY;

        return { x: this.currentX, y: this.currentY };
    }
}
