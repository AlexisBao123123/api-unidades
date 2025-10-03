const express = require('express');
const cors = require('cors');    // habilita peticiones externas

const app = express();

app.use(cors());                           // habilita peticiones externas
app.use(express.json());                   // <--- necesario para leer JSON
app.use(express.urlencoded({ extended: true })); // para leer formularios

const unidadesRoutes = require('./routes/unidades.js');
app.use('/api/unidades', unidadesRoutes);

const PORT = 25253;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));