const express = require("express");
const Contenedor = require('./Contenedor');
const { Router } = express;
const app = express();
const router = Router();

const container = new Contenedor(`${__dirname}/productos.txt`);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Get all products
router.get("/productos", async (request, response) => {
  const results = await container.getAll();
  response.json(results);
});

// Save new product
router.post("/productos", async (request, response) => {
  const results = await container.save(request.body);
  response.json(results);
});

// Get a specific product
router.get("/productos/:id", async (request, response) => {
  let results = await container.getById(parseInt(request.params.id,10));
  if(!results){
    results = {error: 'producto no encontrado'};
  }
  response.json(results);
});

// Update a specific product
router.put("/productos/:id", async (request, response) => {
  let results;
  let product = await container.getById(parseInt(request.params.id,10));
  if(!product){
    results = {error: 'producto no encontrado'};
  }else{
    results = await container.update(parseInt(request.params.id,10),request.body);
  }
  response.json(results);
});

// Delete a specific product
router.delete("/productos/:id", async (request, response) => {
  let results;
  let product = await container.getById(parseInt(request.params.id,10));
  if(!product){
    results = {error: 'producto no encontrado'};
  }else{
    await container.deleteById(parseInt(request.params.id,10),request.body);
  }
  response.json({mensaje: 'producto eliminado'});
});

app.use('/api', router);

const listener = app.listen(8080, () => {
  console.log("Server listening on port " + listener.address().port);
});
