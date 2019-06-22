const Planeta = require('../../../api/planetas/model');

describe('Model', () => {

	let insertedPlanet;
	let planetaInfo = {
		nome: 'Naboo',
		clima: 'Temperado',
		terreno: 'florestas, montanhas...',
		filmes: 0
	};

	it('constructor check', async () => {
		const planeta = new Planeta(planetaInfo);

		expect(planeta).toEqual(planetaInfo);
	});

	it('buscar info', async () => {
		const planeta = await Planeta.criarComInfo(planetaInfo);

		expect(planeta).toEqual({
			...planetaInfo,
			filmes: 4
		});
	});

	it('salvar', async () => {
		const planeta = await Planeta.criarComInfo(planetaInfo);

		const result = await planeta.salvar();
		expect(result).toHaveProperty('insertedCount', 1);

		insertedPlanet = result.insertedId;
	});

	it('listar', async () => {
		const result = await Planeta.listar();
		expect(result).toHaveProperty('length');
		expect(result.length).toEqual(1);
	});

	it('buscar id', async () => {
		const result = await Planeta.get(insertedPlanet);
		expect(result)
			.toEqual({
				id: insertedPlanet,
				...planetaInfo,
				filmes: 4
			});
	});

	it('buscar nome', async () => {
		const result = await Planeta.listar({nome: planetaInfo.nome});
		expect(result).toHaveProperty('length');
		expect(result.length).toEqual(1);
		expect(result[0])
			.toEqual({
				id: insertedPlanet,
				...planetaInfo,
				filmes: 4
			});
	});

	it('remover', async () => {
		const result = await Planeta.remover(insertedPlanet);
		expect(result).toHaveProperty('deletedCount', 1);
	});


	afterAll(async () => {
		await Planeta.closeConnection();
	});

});