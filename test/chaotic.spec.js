import { ChaoticMap, KeyGenerator } from '../src';

describe('ChaoticMap', () => {
  test('Encrypt and decrypt should produce the same value', () => {
    const chaoticMap = new ChaoticMap('testKey');
    const originalValue = 'Hello, World!';

    const encryptedValue = chaoticMap.encrypt(originalValue);
    const decryptedValue = chaoticMap.decrypt(encryptedValue);

    expect(decryptedValue).toBe(originalValue);
  });

  test('Encrypt and decrypt should be consistent with the same key', () => {
    const key = 'testKey';
    const chaoticMap1 = new ChaoticMap(key);
    const chaoticMap2 = new ChaoticMap(key);

    const originalValue = 'Hello, World!';

    const encryptedValue1 = chaoticMap1.encrypt(originalValue);
    const decryptedValue1 = chaoticMap1.decrypt(encryptedValue1);

    const encryptedValue2 = chaoticMap2.encrypt(originalValue);
    const decryptedValue2 = chaoticMap2.decrypt(encryptedValue2);

    expect(decryptedValue1).toBe(originalValue);
    expect(decryptedValue2).toBe(originalValue);
  });
});


describe('KeyGenerator', () => {
  test('Generated key should have the expected length', () => {
    const keyGenerator = new KeyGenerator();
    const generatedKey = keyGenerator.generateKey();

    expect(generatedKey.length).toBe(64);
  });

  test('Generated keys with the same seed should be equal', () => {
    const keyGenerator1 = new KeyGenerator();
    const keyGenerator2 = new KeyGenerator();

    const generatedKey1 = keyGenerator1.generateKey();
    const generatedKey2 = keyGenerator2.generateKey();

    expect(generatedKey1).toBe(generatedKey1);
  });
});
