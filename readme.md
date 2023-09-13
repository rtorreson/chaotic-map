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
import { ChaoticMap, KeyGeneratorChaoticMap } from 'chaotic-map'; 

const keyGenerator = new KeyGeneratorChaoticMap();
const key = keyGenerator.generateKey();

const cm = new ChaoticMap(key); 

const encryptValue = cm.encrypt(key);
console.log('Texto criptografado:', encryptValue);

const valueEncrypt = cm.decrypt(encryptValue);
console.log('Texto descriptografado:', valueEncrypt);

```
