const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*', // Permite solicitudes de cualquier origen
  methods: ['GET', 'POST'],
  credentials: true // Permite el uso de cookies
}));

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'memoria_magica'
});

// Verificar conexión
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ', err.stack);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Middleware para manejar JSON y cookies
app.use(bodyParser.json());
app.use(cookieParser());

// Servir archivos estáticos (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ success: false, message: 'Email y contraseña son requeridos' });
  }

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ success: false, message: 'Error en la base de datos' });
    }

    if (results.length === 0 || results[0].contrasena !== contrasena) {
      return res.status(400).json({ success: false, message: 'Credenciales incorrectas' });
    }

    const usuario = results[0];
    res.cookie('idUsuario', usuario.idUsuario, { httpOnly: true, sameSite: 'strict' });
    res.json({ success: true, idUsuario: usuario.idUsuario });
  });
});

// Ruta para registrar un usuario
app.post('/registrar-usuario', (req, res) => {
  const { nombre, apellidos, email, contrasena } = req.body;

  if (!nombre || !apellidos || !email || !contrasena) {
    return res.status(400).json({ success: false, message: 'Faltan campos requeridos' });
  }

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error al verificar el email:', err);
      return res.status(500).json({ success: false, message: 'Error al verificar el email' });
    }

    if (results.length > 0) {
      return res.status(400).json({ success: false, message: 'El email ya está registrado' });
    }

    const query = 'INSERT INTO usuarios (nombre, apellidos, email, contrasena, fechaRegistro) VALUES (?, ?, ?, ?, NOW())';
    db.query(query, [nombre, apellidos, email, contrasena], (err) => {
      if (err) {
        console.error('Error al insertar el usuario:', err);
        return res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
      }

      return res.status(200).json({ success: true, message: 'Usuario registrado con éxito' });
    });
  });
});

// Ruta para guardar las estadísticas del juego
app.post('/guardar-estadisticas', (req, res) => {
  const { idUsuario, idReto, tiempoJuego, puntuacion } = req.body;

  if (!idUsuario || !idReto || !tiempoJuego || !puntuacion) {
    return res.status(400).json({ success: false, message: 'Datos incompletos' });
  }

  db.query(
    'INSERT INTO estadisticas (idUsuario, idReto, tiempoJuego, puntuacion, fecha) VALUES (?, ?, ?, ?, NOW())',
    [idUsuario, idReto, tiempoJuego, puntuacion],
    (err) => {
      if (err) {
        console.error('Error al guardar las estadísticas:', err);
        return res.status(500).json({ success: false, message: 'Error al guardar las estadísticas' });
      }
      res.status(200).json({ success: true, message: 'Estadísticas guardadas con éxito' });
    }
  );
});


// Ruta para obtener los retos disponibles
app.get('/retos', (req, res) => {
  db.query('SELECT * FROM retos', (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error al obtener los retos' });
      return;
    }
    res.status(200).json({ success: true, retos: results });
  });
});

// Ruta para obtener las competencias del usuario
app.get('/competencias/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;
  db.query('SELECT * FROM competencias WHERE idUsuario = ?', [idUsuario], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error al obtener las competencias' });
      return;
    }
    res.status(200).json({ success: true, competencias: results });
  });
});

//Ruta para obtener las estadísticas
app.get('/estadisticas/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;

  db.query(
    'SELECT idReto, tiempoJuego, puntuacion, fecha FROM estadisticas WHERE idUsuario = ?',
    [idUsuario],
    (err, results) => {
      if (err) {
        console.error('Error al obtener estadísticas:', err);
        return res.status(500).json({ success: false, message: 'Error al obtener las estadísticas' });
      }

      // Verifica los resultados
      console.log('Resultados de la consulta:', results);

      // Siempre devuelve un arreglo, incluso si está vacío
      res.status(200).json({ success: true, estadisticas: results || [] });
    }
  );
});

// Ruta para marcar reto completado y desbloquear el siguiente
app.post('/marcar-reto-completado', (req, res) => {
  const { idUsuario, idReto, fechaCompletado } = req.body;

  // Asegúrate de que los datos sean válidos
  if (!idUsuario || !idReto || !fechaCompletado) {
    return res.status(400).json({ success: false, message: 'Faltan datos requeridos' });
  }

  const query = 'INSERT INTO retos_completados (idUsuario, idReto, fechaCompletado) VALUES (?, ?, ?)';

  db.query(query, [idUsuario, idReto, fechaCompletado], (error, results) => {
    if (error) {
      console.error('Error al insertar en la base de datos:', error); // Agrega un log para depuración
      return res.status(500).json({ success: false, message: 'Error al marcar reto como completado', error });
    }
    res.json({ success: true });
  });
});

// Ruta para verificar si el reto ha sido completado con la puntuación necesaria
app.get('/verificar-reto-completado/:idUsuario/:idReto', async (req, res) => {
  const { idUsuario, idReto } = req.params;

  try {
    // Verificar el reto anterior
    const retoAnteriorResults = await new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM retos WHERE idUsuario = ? AND idReto = ?',
        [idUsuario, idReto - 1],
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        }
      );
    });

    const retoAnterior = retoAnteriorResults[0];

    if (!retoAnterior) {
      return res.status(404).json({ success: false, message: "Reto no encontrado" });
    }

    // Verificar estadísticas
    const estadisticasResults = await new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM estadisticas WHERE idReto = ? AND idUsuario = ?',
        [idReto - 1, idUsuario],
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        }
      );
    });

    const estadisticasExisten = estadisticasResults.length > 0;

    res.status(200).json({
      success: true,
      retoCompletado: estadisticasExisten
    });
  } catch (error) {
    console.error("Error al verificar el reto:", error);
    res.status(500).json({ success: false, message: "Error al verificar el reto" });
  }
});

// Ruta para asignar la competencia
app.post('/asignar-competencia', async (req, res) => {
  try {
    const { idUsuario, idReto, nombreCompetencia, nivel } = req.body;

    // Lógica para asignar competencia
    const query = 'INSERT INTO competencias (idUsuario, idReto, nombreCompetencia, nivel) VALUES (?, ?, ?, ?)';
    await db.promise().query(query, [idUsuario, idReto, nombreCompetencia, nivel]);

    res.status(200).json({ message: 'Competencia asignada correctamente' });
  } catch (error) {
    console.error('Error al asignar competencia:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});
// Ruta para verificar puntuación de retos
app.get('/verificar-puntuacion-retos/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;
  const query = `
    SELECT 
      SUM(CASE WHEN idReto = 1 THEN puntuacion ELSE 0 END) as puntuacionReto1,
      SUM(CASE WHEN idReto = 2 THEN puntuacion ELSE 0 END) as puntuacionReto2,
      SUM(CASE WHEN idReto = 3 THEN puntuacion ELSE 0 END) as puntuacionReto3
    FROM estadisticas 
    WHERE idUsuario = ?
  `;
  
  db.query(query, [idUsuario], (error, results) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Error al verificar puntuaciones' });
    }
    
    res.json({
      success: true,
      puntuacionReto1: results[0].puntuacionReto1 || 0,
      puntuacionReto2: results[0].puntuacionReto2 || 0,
      puntuacionReto3: results[0].puntuacionReto3 || 0
    });
  });
});
// Ruta para agregar un comentario
app.post('/comentarios', (req, res) => {
  const { comentario, idUsuario } = req.body;

  db.query(
      'INSERT INTO comentarios (comentario, idUsuario, fecha) VALUES (?, ?, NOW())',
      [comentario, idUsuario],
      (err) => {
          if (err) {
              console .error('Error al añadir comentario:', err);
              return res.status(500).json({ success: false, message: 'Error al añadir comentario' });
          }
          res.status(200).json({ success: true, message: 'Comentario añadido con éxito' });
      }
  );
});

// Ruta para obtener todos los comentarios
app.get('/comentarios', (req, res) => {
    db.query('SELECT comentario, fecha FROM comentarios', (err, results) => {
        if (err) {
            console.error('Error al obtener comentarios:', err);
            return res.status(500).json({ success: false, message: 'Error al obtener comentarios' });
        }
        res.status(200).json({ success: true, comentarios: results });
    });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});