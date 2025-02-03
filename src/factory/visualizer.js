/**
 * Class for visualizing chaotic maps.
 */
export default class Visualizer {
    /**
     * Creates a new instance of Visualizer.
     * @param {Object} map - An object representing a chaotic map with iterate() method.
     */
    constructor(map) {
        this.map = map;
    }

    /**
     * Visualizes the chaotic map by iterating it for a specified number of iterations.
     * @param {number} iterations - The number of iterations to visualize.
     */
    visualize(iterations) {
        const states = [];
        let currentState = { ...this.map.getState() };

        for (let i = 0; i < iterations; i++) {
            currentState = this.map.iterate();
            states.push({ ...currentState });
        }

        return states;
    }
}
