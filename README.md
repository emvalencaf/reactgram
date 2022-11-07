# Reactgram

Esse projeto foi desenvolvido durante o [Curso de React do Mattheus Battisti](https://www.udemy.com/course/react-do-zero-a-maestria-c-hooks-router-api-projetos/), na plataforma da Udemy.

O objetivo é desenvolver uma mock do instagram fullstack usando o framework do ReactJS, no front-end, e o NodeJS, no back-end.

## Sobre o projeto

Esse projeto foi dividido em dois diretórios:

1. Frontend;
2. Backend.

### Funcionalidades disponíveis no ReactGram

- [x] Registar usuários e logar e sair usuários, com encriptação de senhas (usando o pacote bcryptjs);
- [x] Postar, deletar e editar (o título das) fotos (cujos seus arquivos ficarão guardados no servidor da RESTFUL API );
- [x] Atualização do perfil de usuário (exceto e-mail), com a possibilidade de trocar a foto do usuário;
- [x] Procura de fotos por meio do título das fotos;
- [x] Página, ao estilo, "dashboard" para postar, visualizar todas as fotos do usuário, deletar e editar (o título), de fotos;
- [x] Página principal para visualizar todas as fotos postadas no servidor RESTFUL API do Reactram;
- [x] Consumo das rotas (de deleção, adição, edição, busca e fetch, de fotos e usuários) em dependência de tokens ( gerados por meio do pacote jwt).

### Consideranções sobre o backend
No diretório ``backend`` foi desenvolvido, usando o NodeJS, uma RESTFUL API para ser consumido pela parte frontend. O design pattern do backend foi repository.

Leia o ``README.md`` do diretório backend para saber mais sobre o desenvolvimento do backend.

### Considerações sobre o frontend
No diretório ``frontend`` foi desenvolvido, usando o ReactJS, uma Single Page Application(SPA). Nessa aplicação web é consumida a RESTFUL API desenvolvida no backend.

Leia o ``README.md`` do diretório frontend para saber mais sobre o desenvolvimento do frontend.

### Como usar
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

5. Abra outro terminal no diretório ``frontend`` e baixe os pacotes em dependência deste diretório usando o comando: `npm install`;

6. Em seguida, vá ao diretório ``frontend > src > utils`` e configurar as strings no  arquivo ```config.utils.js``:
````
// URL for API
export const api = // Coloque a URL da sua API
export const uploads = // Coloque o path para o diretório de imagens da sua API

````
7. No terminal aberto no diretório do ``frontend`` digite o comando: `npm start`.
