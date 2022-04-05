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
  const results = await container.getById(request.params.id);
  response.json(results);
});

// Update a specific product
router.put("/productos/:id", async (request, response) => {
  const results = await container.update(request.params.id,request.body);
  const index = Math.floor(Math.random() * results.length);
  response.json(results[index]);
});

// Delete a specific product
router.delete("/productos/:id", async (request, response) => {
  const results = await container.deleteById(request.params.id);
  const index = Math.floor(Math.random() * results.length);
  response.json(results[index]);
});

app.use('/api', router);

const listener = app.listen(8080, () => {
  console.log("Server listening on port " + listener.address().port);
});
