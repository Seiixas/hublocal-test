![HubLocal_logo](https://hublocal.com.br/wp-content/uploads/2021/03/Logo_Horizontal_Alta_Azul_2-1024x358.png)

# HubLocal Challenge 3.0

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Material](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)

## Sobre o Projeto

O projeto foi criado utilizando a stack PERN (Postgres, Express, React, Node). No back-end, foi utilizado o Swagger para documentação da API, além do uso do TDD para dar um norte no desenvolvimento e evitar falhas de implementação. Ademais, seguindo todos os padrões de SOLID e Clean Code para tornar o código mais manutenível e seguro.
No front-end, foi utilizado o MaterialUI, React, TypeScript, CSS Flexbox e Grid e Styled Componentes (de uma forma mais crua). Confesso que não sou o melhor no front-end, contudo aprendi bastante e consegui aplicar muita coisa para tornar o teste mais rico.

## Funcionalidades

### Usuários

- Listagem de usuários.
- Criação de usuário.
- Edição de usuário.
- Atualização de usuário
- Deleção de usuário.
- Autenticação de usuário.

### Empresas

- Listagem de empresas.
- Criação de empresa.
- Edição de empresa.
- Deleção de empresa.

### Responsáveis

- Listagem de responsáveis.
- Criação de responsável.
- Edição de responsável.
- Deleção de responsável.

### Localizações

- Listagem de Localizações.
- Criação de localização.
- Edição de localização.
- Deleção de localização.

### Tickets

- Listagem de tickets.
- Visualização de ticket.
- Criação de ticket a partir do local.

## Como rodar o projeto

Antes de mais nada, é necessário o Node.js na máquina para executar os projetos.

### Banco de Dados

Antes de iniciar o back-end, é necessário subir um container no Docker com a imagem do Postgres. Para que não seja necessária nenhuma alteração no código-fonte, utilize o seguinte comando:

```bash
docker run --name hublocal_db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

### Back-end

Para rodar o back-end, entre na pasta back-end e exeute:

```bash
# Instalando dependencias
npm run install    # Se estiver usando o NPM
yarn               # Se estiver usando o Yarn

# Rodando o back-end
npm run dev        # Se estiver usando o NPM
yarn dev           # Se estiver usando o Yarn
```

Crie um arquivo `.env` na pasta `src` para definir qual será o secret do JsonWebToken:

```
JWT_TOKEN=12312312
```

Toda a documentação está disponível na rota `localhost:3333/api/v1/docs`
O back-end será iniciado na porta 3333.

### Front-end

Para rodar o front-end, entre na pasta front-end e exeute:

```bash
# Instalando dependencias
npm run install    # Se estiver usando o NPM
yarn               # Se estiver usando o Yarn

# Rodando o front-end
npm run dev      # Se estiver usando o NPM
yarn dev         # Se estiver usando o Yarn
```

O front-end será iniciado na porta 3000.

## Agradecimentos

Agradeço profundamente a Hublocal por mais uma oportunidade de mostrar minhas habilidades.
