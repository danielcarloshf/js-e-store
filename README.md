# JS E-Store: Análise de uma Aplicação Node + Express

**DCC605 - Projeto Orientado em Computação II**

**Aluno:** Daniel Carlos Hovadick Félix - [dfelix@dcc.ufmg.br](mailto://dfelix@dcc.ufmg.br)

**Orientador:** Marco Tulio Valente - [mtov@dcc.ufmg.br](mailto://mtov@dcc.ufmg.br)

## Introdução

Uma aplicação Web consiste basicamente da interação entre clientes que fazem requisições e um servidor que as atende. Node.js e o ExpressJS formam uma plataforma de software que possibilita a implementação desses aplicativos em JavaScript de forma escalável.

O objetivo deste trabalho é implementar uma loja de comércio eletrônico e assim realizar uma análise da arquitetura de uma aplicação Node + Express. Para isso será feita a descrição da arquitetura do aplicativo  desenvolvido e testes para verificar a escalabilidade e robustez da implementação.

## JavaScript E-Store

Aplicação com o objetivo de demonstração. Simula um website de e-commerce.

O Node provê uma API RESTful. O JADE fornece os templates para o frontend, respectivamente, e o Express administra a API. MongoDB é o servidor de banco de dados.

## Requisitos

- [MongoDB](http://mongodb.org)
- [Node and npm](http://nodejs.org)

## Instalação

Assumindo que o servidor MongoDB está instalado e ativo:

1. Clone o repositório: `git clone https://danielcarloshf@bitbucket.org/danielcarloshf/js-e-store.git`
2. Instale a aplicação: `sudo npm install`
3. Inicie o servidor: `node server.js`
4. Visualize no browser em `http://localhost:8080`
