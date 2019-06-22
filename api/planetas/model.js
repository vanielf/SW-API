const util = require('util');
const Database = require('../../database');
const swapi = require('swapi-node');

const DB = new Database('planetas');


const required = (msg) => {
	throw new Error(msg);
}


class Planeta {

	constructor(obj){
		if(!util.isUndefined(obj)){
			this.nome = obj.nome || required('Nome é obrigatório!');
			this.clima = obj.clima || required('Clima é obrigatório!');
			this.terreno = obj.terreno || required('Terreno é obrigatório!');
			this.filmes = obj.filmes || 0;
		}
	}

	salvar(){
		if(this.id) throw new Error('Já salvo!');
		return Planeta.adicionar(this);
	}

	remover(){
		if(!this.id) throw new Error('Ainda não salvo!');
		return Planeta.remover(this.id);
	}

	setFrom(obj){
		this.id = obj._id;
		this.nome = obj.nome;
		this.clima = obj.clima;
		this.terreno = obj.terreno;
		this.filmes = obj.filmes;
	}


	static async criarComInfo(obj = {}){
		obj.filmes = 0;
		if(obj.nome){
			const info = await Planeta.buscarInfo(obj.nome);
			if(info){
				obj.filmes = info.films.length;
			}
		}

		return new Planeta(obj);
	}

	static buscarInfo(planeta){
		return swapi
			.get(`https://swapi.co/api/planets?search=${planeta}`)
			.then(res => {
				if(res.count > 0) return res.results[0];

				return null;
			}).catch(err => {
				return null;
			});
	}

	static parse(obj){
		if(!obj) return null;

		const planeta = new Planeta();
		planeta.setFrom(obj);
		return planeta;
	}

	static adicionar(planeta){
		return DB.getClient().then(db => {
			return db.insertOne(planeta);
		});
	}

	static remover(id){
		return DB.getClient().then(db => {
			return db.deleteOne({ _id: Database.ObjectID(id) });
		});
	}

	static get(id){
		return DB.getClient().then(db => {
			return db.findOne({ _id: Database.ObjectID(id) })
				.then(Planeta.parse);
		});
	}

	static listar(query = {}){
		return DB.getClient().then(db => {
			const filter = {};
			if(query.nome) filter.nome = query.nome;
			if(query.id) filter._id = Database.ObjectID(query.id);

			return db.find(filter)
				.toArray();
		}).then(result => result.map(Planeta.parse));
	}

	static closeConnection(){
		return DB.getClient()
			.then(client => {
				return client.close();
			});
	}
}

module.exports = Planeta;