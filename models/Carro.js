class Carro
{

	constructor(id,timestamp,productos=[])
	{
		this.id 			=	id;
		this.timestamp		=	timestamp;
		this.productos		=	productos;
	}
}

module.exports = Carro
