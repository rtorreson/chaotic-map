# ChaoticMap

A classe `ChaoticMap` é uma implementação em TypeScript de um utilitário de criptografia baseada em mapa caótico e AES (Advanced Encryption Standard). Ela permite criptografar e descriptografar dados usando o algoritmo AES-256-CBC com base em uma chave caótica fornecida.

## Como funciona

A classe `ChaoticMap` aceita uma chave caótica na inicialização. Essa chave é usada para gerar uma chave de criptografia AES usando o algoritmo SHA-256. Além disso, a classe gera um Initialization Vector (IV) aleatório. Essa chave e o IV são usados nas operações de criptografia e descriptografia.

## Instalação

Para utilizar a classe `ChaoticMap`, siga estas etapas:

1. Certifique-se de ter o Node.js instalado em seu ambiente de desenvolvimento.

2. Instale a biblioteca `crypto` (caso ainda não esteja instalada) executando o seguinte comando no terminal:


3. Copie o código-fonte da classe `ChaoticMap` para o seu projeto.

4. Importe a classe em seu código conforme necessário:

```javascript
import { ChaoticMap, KeyGenerator } from 'chaotic-map';

const keyGenerator = new KeyGenerator();
const key = keyGenerator.generateKey();

const chaoticMap = new ChaoticMap(key);

const encryptedValue = chaoticMap.encrypt(key);
const decryptedValue = chaoticMap.decrypt(encryptedValue);

console.log(encryptedValue); // b9d7a6521f6436971723364265a6bed12db5444814450aca70ecfdc1bca2d2de0867caa3412e7293d99720d60432e202019b230b193b8032dd88d372ebdd2f6d1dcb2538e953e7d5aeea6b3488c52246

console.log(decryptedValue); // d790b173a6cff9125b5ec6e2558a51a49d8d27d231de7c841baf9a134b01062c


```
