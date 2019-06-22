const request = require('supertest');
const api = require('../../../api');


describe('Rotes', () => {

	let insertedPlanet;
	let planetaInfo = {
		nome: 'Naboo',
		clima: 'Temperado',
		terreno: 'florestas, montanhas...'
	};

	it('salvar', (done) => {
		request(api)
			.post('/planetas')
			.send(planetaInfo)
			.expect(200)
			.then(response => {
				insertedPlanet = response.body;
				done();
			});
	});

	it('get id', (done) => {
		request(api)
			.get(`/planetas/${insertedPlanet}`)
			.expect(200)
			.then(response => {
				expect(response.body)
					.toEqual({
						id: insertedPlanet,
						...planetaInfo,
						filmes: 4
					});
				done();
			});
	});

	it('listar', (done) => {
		request(api)
			.get('/planetas')
			.expect(200)
			.then(response => {
				expect(response.body).toHaveProperty('length');
				expect(response.body.length).toEqual(1);
				done();
			});
	});

	it('buscar nome', (done) => {
		request(api)
			.get(`/planetas?nome=${planetaInfo.nome}`)
			.expect(200)
			.then(response => {
				expect(response.body).toHaveProperty('length');
				expect(response.body.length).toEqual(1);
				expect(response.body[0])
					.toEqual({
						id: insertedPlanet,
						...planetaInfo,
						filmes: 4
					});
				done();
			});
	});

	it('remover', (done) => {
		request(api)
			.delete(`/planetas/${insertedPlanet}`)
			.expect(200, done);
	});

});