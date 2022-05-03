class Producto
{

	constructor(id,title,price,foto,timestamp,descripcion,codigo,stock)
	{
		this.id 					=	id;
		this.title				=	title;
		this.price				=	price;
		this.foto					=	foto;
		this.timestamp		=	timestamp;
		this.descripcion	=	descripcion;
		this.codigo				=	codigo;
		this.stock				=	stock;
	}
}

module.exports = Producto
