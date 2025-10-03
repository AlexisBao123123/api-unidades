const express = require('express');
const cors = require('cors');
const path = require('path'); // Necesario para manejar rutas de archivos
// const pool = require('./db.js'); // Asume que tienes tu módulo de conexión a DB
// const unidadesRoutes = require('./routes/unidades.js'); // Mantienes tus rutas API

const app = express();

// --- CONFIGURACIÓN DE VISTAS (FRONTEND) ---
// 1. Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
// 2. Establecer la carpeta donde están tus archivos EJS (ej: views/index.ejs)
// ASUME que tienes una carpeta llamada 'views' en la raíz de tu proyecto.
app.set('views', path.join(__dirname, 'views')); 

// 3. Configurar Express para servir archivos estáticos (CSS, JS, imágenes, etc.)
// Esto es VITAL para que Bootstrap, CSS, y el JS de SweetAlert funcionen.
// ASUME que tus archivos estáticos están en una carpeta 'public', si no, cambia 'public' por la carpeta donde estén (ej: '/').
app.use(express.static(path.join(__dirname, 'public'))); 

// --- CONFIGURACIÓN DE MIDDLEWARE (BACKEND) ---
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// --- DEFINICIÓN DE RUTAS API ---
// app.use('/api/unidades', unidadesRoutes); 
// Incluye el resto de tus rutas API aquí, por ejemplo:
// app.use('/api/productos', require('./routes/productos.js'));


// --- RUTA RAÍZ (REEMPLAZA Cannot GET /) ---
app.get('/', async (req, res) => {
    try {
        // **ESTO ES TEMPORAL.** // Aquí es donde deberías llamar a tu función de la DB para obtener los productos.
        // Ejemplo: const [productos] = await pool.query('CALL sp_listarproductos()');
        
        // Usamos datos dummy (simulados) para asegurar que la vista se renderice
        const productos = [
             { id_pro: 1, nom_pro: 'Teclado lenovo Legion', marca: 'Lenovo', categoria: 'Teclado', pre_pro: 200.00, stk_pro: 100, estado: 'A' },
             { id_pro: 2, nom_pro: 'Mouse lenovo', marca: 'Lenovo', categoria: 'Mouse', pre_pro: 80.00, stk_pro: 200, estado: 'A' }
        ];
        
        // Renderiza el archivo index.ejs y le pasa los datos necesarios para llenar la tabla
        res.render('index', { 
            productos: productos,
            // Valores que tu EJS usa pero que no están definidos en este ejemplo:
            busqueda: '', 
            tipo: 'todos', 
            error: null 
        });

    } catch (error) {
        console.error("Error al cargar la interfaz de productos:", error);
        // Si hay un error de DB, Render mostrará esto:
        res.status(500).send("Error interno: No se pudo conectar a la base de datos.");
    }
});


// --- INICIO DEL SERVIDOR ---
// Nota: Render proporciona la variable PORT. ¡No uses un puerto fijo!
const RENDER_PORT = process.env.PORT || 8080; 
app.listen(RENDER_PORT, () => console.log(`Servidor iniciado en el puerto ${RENDER_PORT}`));

// NOTA IMPORTANTE: La línea const PORT = 25253; debe eliminarse o cambiarse a process.env.PORT.