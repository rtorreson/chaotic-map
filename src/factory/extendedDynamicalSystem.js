/**
 * Class representing an Extended Dynamical System.
 */
export default class ExtendedDynamicalSystem {
  /**
   * Creates a new instance of Extended Dynamical System.
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

    /**
     * The initial state of the system for the variable z.
     * @type {number}
     */
    this.currentZ = Math.random();
  }

  /**
   * Iterates the system forward by one time step.
   * @returns {Object} An object containing the updated values of x, y, and z.
   */
  iterate() {
    this.currentX = Math.sin(this.currentY) + this.currentZ;
    this.currentY = Math.cos(this.currentX) + this.currentZ;
    this.currentZ = Math.sin(this.currentX) + Math.cos(this.currentY);

    return { x: this.currentX, y: this.currentY, z: this.currentZ };
  }
}
