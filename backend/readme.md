# backend do reactgram

A backend do projeto reactgram foi desenvolvido durante o (curso de React do Mattheus Battisti)[https://www.udemy.com/course/react-do-zero-a-maestria-c-hooks-router-api-projetos/].

O backend será desenvolvido usando o design pattern Repository.

## Sobre a RESTFUL API do ReactGram

No diretório ``backend`` foi desenvolvido, usando o NodeJS, uma RESTFUL API para ser consumido pela parte frontend. O design pattern do backend foi repository.

Foi isolado as regras do negócio no controller que chamará os métodos que acessarão os métodos do Banco de Dados do MongoDB.

### Como usar a RESTFUL API do ReactGram
1. Abra um terminal no diretório ``backend`` e baixe os pacotes em dependência para o backend, usando o seguinte comando: `npm install`;

2. Em seguida, crie uma pasta ``uploads`` na raiz do diretório ``backend``, se já não houver, e nela crie outras duas pastas ``users`` e ```photos``. Tais pastas serão necessárias para reprodução das imagens;

3. Há duas formas para abrir o servidor backend, a primeira é passando as seguintes variáveis de ambiente pelo comando ``npm start``:

````
PORT=// A porta em que será colocado o servidor
DB_USER=// Coloque o username no banco de dados do MongoDB
DB_PASS=// Coloque a senha da conta do banco de dados do MongoDB
JWT_SECRET=// Coloque a senha do json web token para gerar o token
````

4. A outra forma para abrir o servidor do backend é criando o arquivo ``.env`` na raiz do diretório ``backend`` colocando as variáveis de ambiente acima.

Baixe, se não houver, o pacote dotenv usando o comando: ```npm install dotenv --dev``.

Em seguida, digite o comando: ``npm run server-dev``;

5. Vá ao ``README.md`` do diretório frontend.