import express,{Router} from "express";
import { getTime } from "./lib/utils";
import Persona from "./models/Persona";
import Producto from "./models/Producto";
import {store,getProducto,getAll} from './controllers/productoscontroller';

 
const p: Persona = new Persona("Coder", "House");

const app = express();
const router = Router();

app.use(express.json())
app.use(express.urlencoded({extended : true}))

 
 
router.post("/", (req, res) => {
 res.send(store(req.body.title,req.body.price,req.body.thumbnail));
});

router.get("/:id", (req, res) => {
    res.send(getProducto(parseInt(req.params.id)));
   });

router.get("/", (req, res) => {
    res.send(getAll());
   });

app.use('/api/productos',router)
  
const PORT = 8080;
app.listen(PORT, () => {
 console.log(`conectado al puerto: ${PORT}`);
});
