import crypto from 'node:crypto';

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
    const randomValue = crypto.randomBytes(16).toString('hex');
    return crypto.createHash('sha256').update(timestamp + randomValue).digest('hex');
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
   * @param {number} currentValue - The current value.
   * @param {number} growthRate - The growth rate.
   * @returns {number} The logistic map value.
   */
  logisticMap(currentValue, growthRate) {
    return growthRate * currentValue * (1 - currentValue);
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

    return crypto.createHash('sha256').update(this.chaoticMapSeed + key).digest('hex');
  }
}

/**
 * A class for performing encryption and decryption using a chaotic map-based key.
 */
export class ChaoticMap {
  /**
   * Constructs a new ChaoticMap instance.
   * @param {string} value - The value used to generate the key.
   */
  constructor(value) {
    this.key = crypto.createHash('sha256').update(value).digest();
    this.iv = crypto.randomBytes(16);
  }

    /**
   * Returns the singleton instance of ChaoticMap.
   * @returns {ChaoticMap} @static The ChaoticMap instance.
   */
    static instance() {
      if (!ChaoticMap.instance) {
        ChaoticMap.instance = new ChaoticMap();
      }
  
      return ChaoticMap.instance; 
    }

  /**
   * Encrypts the given value.
   * @param {string} value - The value to encrypt.
   * @returns {string} The encrypted value.
   */
  encrypt(value) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
    let encrypted = cipher.update(value, 'utf-8', 'hex');
    return encrypted += cipher.final('hex');
  }

  /**
   * Decrypts the given value.
   * @param {string} value - The value to decrypt.
   * @returns {string} The decrypted value.
   */
  decrypt(value) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
    let decrypted = decipher.update(value, 'hex', 'utf-8');
    return decrypted += decipher.final('utf-8');
  }
}
