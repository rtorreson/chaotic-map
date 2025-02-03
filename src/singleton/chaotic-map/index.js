import { randomBytes, createHash, createCipheriv, createDecipheriv } from 'node:crypto';

/**
 * A class for performing encryption and decryption using a chaotic map-based key.
 */
export class ChaoticMap {
    /**
     * Constructs a new ChaoticMap instance.
     * @param {string} value - The value used to generate the key.
     */
    constructor(value) {
        this.key = createHash('sha256').update(value).digest();
        this.iv = randomBytes(16);
        this.map = ''
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
        const cipher = createCipheriv('aes-256-cbc', this.key, this.iv);
        let encrypted = cipher.update(value, 'utf-8', 'hex');
        return encrypted += cipher.final('hex');
    }

    /**
     * Decrypts the given value.
     * @param {string} value - The value to decrypt.
     * @returns {string} The decrypted value.
     */
    decrypt(value) {
        const decipher = createDecipheriv('aes-256-cbc', this.key, this.iv);
        let decrypted = decipher.update(value, 'hex', 'utf-8');
        return decrypted += decipher.final('utf-8');
    }
}