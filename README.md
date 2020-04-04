# Logger.io

Em projetos modernos é cada vez mais comum o uso de arquiteturas baseadas em serviços ou microsserviços. Nestes ambientes complexos, erros podem surgir em diferentes camadas da aplicação (backend, frontend, mobile, desktop) e mesmo em serviços distintos. Desta forma, é muito importante que os desenvolvedores possam centralizar todos os registros de erros em um local, de onde podem monitorar e tomar decisões mais acertadas.

## Como rodar o projeto

Comece clonando o repositório, em seguida:

**Back-end**

1. Entre na pasta `backend/`
2. Execute o comando `npm install`
3. Configure as variáveis de ambiente no arquivo `.env`
4. Execute as migrations com o comando `node ace migration:run`
5. Popule o banco de dados com o comando `node ace seed`
6. Execute o servidor com o comando `node server.js`

**Front-end**

1. Entre na pasta `web/`
2. Execute o comando `npm install`
3. Configure as variáveis de ambiente no arquivo `.env`
4. Execute o servidor com o comando `npm start`

## Integrantes do squad 3

- Daniel dos Santos Cardoso
- Felipe Elias Osti
- Gilberto da Silva Villa Nova
- Hugo Fellipe Trevelin Benevides
