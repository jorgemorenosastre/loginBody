const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Permitir CORS
app.use(bodyParser.json()); // Para poder parsear el JSON en el cuerpo de las solicitudes

// Configurar conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost', // Cambia esto si es necesario
    user: 'root',      // Nombre de usuario de MySQL
    password: '',      // Contraseña de MySQL (deja vacío si no hay)
    database: 'login_app' // Nombre de la base de datos que creaste
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Endpoint de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar el usuario en la base de datos
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        if (results.length > 0) {
            // Login exitoso
            const user = results[0];
            res.json({
                message: 'Login exitoso',
                user: {
                    id: user.id,
                    username: user.username,
                }
            });
        } else {
            // Credenciales incorrectas
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    });
});

// Iniciar el servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
