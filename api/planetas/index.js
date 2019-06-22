const Express = require('express');
const Planeta = require('./model');

const planetas = Express();


planetas.post('/', async (req, res, next) => {
	const planeta = await Planeta.criarComInfo(req.body);
	const result = await planeta.salvar();
	res.send(result.insertedId);
});

planetas.get('/', async (req, res, next) => {
	const result = await Planeta.listar(req.query)
	res.send(result);
});

planetas.get('/:id', async (req, res, next) => {
	const result = await Planeta.get(req.params.id)
	res.send(result);
});

planetas.delete('/:id', async (req, res, next) => {
	const result = await Planeta.remover(req.params.id)
	if(result.deletedCount === 1) res.sendStatus(200);
	else res.sendStatus(404);
});


module.exports = planetas;