import { randomBytes, createHash } from 'node:crypto';
import { LogisticMap } from '../../factory/index.js';

/**
 * A class for generating cryptographic keys using chaotic maps.
 */
export class KeyGenerator {
    /**
     * Constructs a new KeyGenerator instance.
     */
    constructor() {
        this.initializeHenonMap();
        this.chaoticMapSeed = this.generateChaoticMapSeed();
    }

    /**
     * Returns the singleton instance of KeyGenerator.
     * @returns {KeyGenerator} The KeyGenerator instance.
     */
    instance() {
        if (!KeyGenerator.instance) {
            KeyGenerator.instance = new KeyGenerator();
        }

        return KeyGenerator.instance;
    }

    /**
     * Initializes the Henon map parameters.
     */
    initializeHenonMap() {
        this.henonParameters = { currentX: 0.1, currentY: 0.1, currentTime: 0, sinCoefficient: 0.1, cosCoefficient: 0.05 };
    }

    /**
     * Generates a seed for the chaotic map.
     * @returns {string} The generated seed.
     */
    generateChaoticMapSeed() {
        const timestamp = Date.now().toString();
        const randomValue = randomBytes(16).toString('hex');
        return createHash('sha256').update(timestamp + randomValue).digest('hex');
    }

    /**
     * Updates the Henon map with given parameters.
     * @param {number} x - The current x value.
     * @param {number} y - The current y value.
     * @param {number} t - The current time value.
     * @param {number} sinCoefficient - The sine coefficient.
     * @param {number} cosCoefficient - The cosine coefficient.
     * @returns {{updatedX: number, updatedY: number}} The updated x and y values.
     */
    updateHenonMap(x, y, t, sinCoefficient, cosCoefficient) {
        const a = 1.4 + sinCoefficient * Math.sin(t);
        const b = 0.3 + cosCoefficient * Math.cos(t);
        const nextX = y + 1 - a * x * x;
        const nextY = b * x;
        return { updatedX: nextX, updatedY: nextY };
    }

    /**
     * Calculates the logistic map value.
     * @returns {number} The logistic map value.
     */
    logisticMap() {
        return new LogisticMap().iterate()
    }

    /**
     * Generates a cryptographic key using chaotic maps.
     * @returns {string} The generated key.
     */
    generateKey() {
        let key = '';

        for (let i = 0; i < 16; i++) {
            const { updatedX: henonUpdatedX, updatedY: henonUpdatedY } = this.updateHenonMap(
                this.henonParameters.currentX,
                this.henonParameters.currentY,
                this.henonParameters.currentTime,
                this.henonParameters.sinCoefficient,
                this.henonParameters.cosCoefficient
            );

            this.henonParameters.currentX = henonUpdatedX;
            this.henonParameters.currentY = henonUpdatedY;
            this.henonParameters.currentTime++;

            const logisticNextValue = this.logisticMap(this.henonParameters.currentX, 3.7);

            const combinedValue = (henonUpdatedX + henonUpdatedY + logisticNextValue) / 3;
            const charCode = Math.floor(combinedValue * 256) % 256;
            key += String.fromCharCode(charCode);
        }

        return createHash('sha256').update(this.chaoticMapSeed + key).digest('hex');
    }
}
