/**
 * Class representing a Chua Oscillator.
 */
export default class ChuaOscillator {
    /**
     * Creates a new instance of Chua Oscillator.
     */
    constructor() {
        this.state = {
            x: Math.random(),
            y: 0,
            z: 0
        };
    }

    /**
     * Advances the Chua Oscillator by one time step.
     * @returns {Object} An object containing the new values of x, y, and z.
     */
    iterate() {
        const alpha = 15.6;
        const beta = 28;
        const gamma = 3;

        const { x, y, z } = this.state;

        const xRateOfChange = alpha * (y - x - gamma * x);
        const yRateOfChange = x - y + z;
        const zRateOfChange = -beta * y;

        this.state.x += xRateOfChange;
        this.state.y += yRateOfChange;
        this.state.z += zRateOfChange;

        return { x: this.state.x, y: this.state.y, z: this.state.z };
    }
}
