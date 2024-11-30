-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 30-11-2024 a las 18:30:43
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `memoria_magica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `idComentario` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `comentario` text DEFAULT NULL,
  `fecha` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`idComentario`, `idUsuario`, `comentario`, `fecha`) VALUES
(5, NULL, 'hola', '2024-11-23 20:07:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competencias`
--

CREATE TABLE `competencias` (
  `idCompetencia` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `idReto` int(11) DEFAULT NULL,
  `nombreCompetencia` varchar(100) DEFAULT NULL,
  `nivel` int(11) NOT NULL DEFAULT 1,
  `fechaActualizacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `competencias`
--

INSERT INTO `competencias` (`idCompetencia`, `idUsuario`, `idReto`, `nombreCompetencia`, `nivel`, `fechaActualizacion`) VALUES
(18, 1, 1, 'Novato', 1, '2024-11-28 19:03:50'),
(19, 1, 2, 'Experto', 2, '2024-11-28 19:11:58'),
(20, 1, 1, 'Novato', 1, '2024-11-30 15:59:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadisticas`
--

CREATE TABLE `estadisticas` (
  `idEstadisticas` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idReto` int(11) NOT NULL,
  `tiempoJuego` int(11) NOT NULL,
  `puntuacion` int(11) NOT NULL DEFAULT 0,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estadisticas`
--

INSERT INTO `estadisticas` (`idEstadisticas`, `idUsuario`, `idReto`, `tiempoJuego`, `puntuacion`, `fecha`) VALUES
(103, 1, 1, 7, 5, '2024-11-30 15:59:07'),
(104, 1, 1, 5, 5, '2024-11-30 15:59:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `retos`
--

CREATE TABLE `retos` (
  `idReto` int(11) NOT NULL,
  `nombreReto` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `nivelDificultad` varchar(20) NOT NULL DEFAULT 'Bajo',
  `puntos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `retos`
--

INSERT INTO `retos` (`idReto`, `nombreReto`, `descripcion`, `nivelDificultad`, `puntos`) VALUES
(1, 'Principiante', 'Primer nivel, vamos a superarlo juntos.', 'bajo', 10),
(2, 'Intermedio', 'Sube el desafío, demuestra tus habilidades.', 'medio', 20),
(3, 'Avanzado', 'Nivel experto, ¿puedes lograrlo?', 'dificil', 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `retos_completados`
--

CREATE TABLE `retos_completados` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idReto` int(11) NOT NULL,
  `fechaCompletado` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `retos_completados`
--

INSERT INTO `retos_completados` (`id`, `idUsuario`, `idReto`, `fechaCompletado`) VALUES
(1, 1, 3, '2024-11-28 17:54:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellidos` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  `fechaRegistro` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `apellidos`, `email`, `contrasena`, `fechaRegistro`) VALUES
(1, 'Nallibe', 'Rivera Grisales', 'j_nallibe_rg@hotmail.com', 'ilerna', '2024-11-11 20:53:28');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`idComentario`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `competencias`
--
ALTER TABLE `competencias`
  ADD PRIMARY KEY (`idCompetencia`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `fk_idReto` (`idReto`);

--
-- Indices de la tabla `estadisticas`
--
ALTER TABLE `estadisticas`
  ADD PRIMARY KEY (`idEstadisticas`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idReto` (`idReto`);

--
-- Indices de la tabla `retos`
--
ALTER TABLE `retos`
  ADD PRIMARY KEY (`idReto`);

--
-- Indices de la tabla `retos_completados`
--
ALTER TABLE `retos_completados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idReto` (`idReto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `idComentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `competencias`
--
ALTER TABLE `competencias`
  MODIFY `idCompetencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `estadisticas`
--
ALTER TABLE `estadisticas`
  MODIFY `idEstadisticas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT de la tabla `retos`
--
ALTER TABLE `retos`
  MODIFY `idReto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `retos_completados`
--
ALTER TABLE `retos_completados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE SET NULL;

--
-- Filtros para la tabla `competencias`
--
ALTER TABLE `competencias`
  ADD CONSTRAINT `competencias_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `fk_idReto` FOREIGN KEY (`idReto`) REFERENCES `retos` (`idReto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `estadisticas`
--
ALTER TABLE `estadisticas`
  ADD CONSTRAINT `estadisticas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `estadisticas_ibfk_2` FOREIGN KEY (`idReto`) REFERENCES `retos` (`idReto`);

--
-- Filtros para la tabla `retos_completados`
--
ALTER TABLE `retos_completados`
  ADD CONSTRAINT `retos_completados_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `retos_completados_ibfk_2` FOREIGN KEY (`idReto`) REFERENCES `retos` (`idReto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
