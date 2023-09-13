import crypto from 'node:crypto';

export class ChaoticMap {
  constructor(value) {
    this.key = crypto.createHash('sha256').update(value).digest();
    this.iv = crypto.randomBytes(16);
  }

  encrypt(value) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
    let encrypted = cipher.update(value, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(value) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
    let decrypted = decipher.update(value, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }
}

export class KeyGeneratorChaoticMap {
  constructor() {
    this.initialize()
  }

  initialize() {
    this.x = 0.1;
    this.y = 0.1;
    this.t = 0
  }

  henonMap(x, y, t) {
    const initialValue = 1.4 + 0.1 * Math.sin(t); 
    const temporalValue = 0.3 + 0.05 * Math.cos(t); 

    const nextX = y + 1 - initialValue * x * x;
    const nextY = temporalValue * x;

    this.x = nextX;
    this.y = nextY;
    this.t++;

    return nextX; 
  }

  generateKey() {
    this.initialize()
    let key = '';

    for (let i = 0; i < 16; i++) {
      const nextValue = this.henonMap(this.x, this.y, this.t);
      const charCode = Math.floor(nextValue * 256) % 256;
      key += String.fromCharCode(charCode);
    }

    return key;
  }
}
