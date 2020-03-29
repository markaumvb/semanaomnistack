const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

/**Método HTTP 
 * 
 * GET: Buscar uma informação do backend
 * POST: criar uma informação no backend
 * PUT: alterar uma informação
 * DELETE: deletar uma informação no backend
*/

/**
 * Tipos de parametros:
 * Query: Parametros nomeados enviados na rota após o símbolo de ? 
 (filtros, paginação) anexando parametros com o símbolo &
 Ex: users/name=Marcus
 const params = request.query

 * Route Params: parametros utilizados para identificar recursos
 Ex: users/1
 const params = request.params

 * Request Body: corpo da requisição, utilizado para criar ou alterar recursos
 * 
 */



app.listen(3333);

