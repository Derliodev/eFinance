-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 02-05-2022 a las 21:12:29
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eFinance`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista`
--

CREATE TABLE `lista` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `nProd` int(11) DEFAULT NULL,
  `nComp` int(11) DEFAULT NULL,
  `toPresup` int(11) DEFAULT NULL,
  `toGast` int(11) DEFAULT NULL,
  `estado` char(255) DEFAULT NULL,
  `alert` varchar(255) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lista`
--

INSERT INTO `lista` (`id`, `nombre`, `nProd`, `nComp`, `toPresup`, `toGast`, `estado`, `alert`, `idUser`, `createdAt`, `updatedAt`) VALUES
(31, 'Lista 1', 2, 1, 15000, 1000, '', '', 3, '2022-05-02 19:04:55', '2022-05-02 19:05:47'),
(32, 'Lista usuario 1', 2, 1, 15000, 8000, '', '', 7, '2022-05-02 19:07:08', '2022-05-02 19:07:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `nPresup` int(11) DEFAULT NULL,
  `nReal` int(11) DEFAULT NULL,
  `tienda` varchar(255) DEFAULT NULL,
  `nota` varchar(255) DEFAULT NULL,
  `estado` char(255) DEFAULT NULL,
  `lista` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `nPresup`, `nReal`, `tienda`, `nota`, `estado`, `lista`, `createdAt`, `updatedAt`) VALUES
(73, 'Producto 1', 5000, 0, 'Jumbo', '', '', 31, '2022-05-02 19:05:06', '2022-05-02 19:05:29'),
(74, 'Producto 2', 15000, 1000, 'Lider', '', 'C', 31, '2022-05-02 19:05:44', '2022-05-02 19:05:47'),
(75, 'producto 1', 10000, 0, 'Jumbo', '', '', 32, '2022-05-02 19:07:19', '2022-05-02 19:07:19'),
(76, 'producto 2', 15000, 8000, 'Lider', '', 'C', 32, '2022-05-02 19:07:31', '2022-05-02 19:07:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20220430011658-create-usuario.js'),
('20220430015951-create-tiendas.js'),
('20220430022442-create-tiendas.js'),
('20220430022451-create-usuario.js'),
('20220430022558-create-tiendas.js'),
('20220430051350-create-lista.js'),
('20220430064122-create-producto.js'),
('20220501021148-create-lista.js'),
('20220501021219-create-lista.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiendas`
--

CREATE TABLE `tiendas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `sucursal` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `estado` char(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tiendas`
--

INSERT INTO `tiendas` (`id`, `nombre`, `sucursal`, `direccion`, `ciudad`, `region`, `estado`, `createdAt`, `updatedAt`) VALUES
(1, 'Lider', 'Express Macul', 'Direccion', 'Ciudad', '13', 'A', '2022-04-29 22:17:55', '2022-04-29 22:17:55'),
(9, 'Jumbo', NULL, 'Direccion', 'Ciudad', '13', NULL, '2022-04-30 04:52:34', '2022-05-02 19:05:56'),
(15, 'Tottus', NULL, 'Direccion falsa', 'Ciudad Falsa', '13', NULL, '2022-05-02 03:35:56', '2022-05-02 03:36:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` char(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`, `role`, `correo`, `createdAt`, `updatedAt`) VALUES
(3, 'admin', '123', 's', 'lio.rios@icloud.com', '2022-04-30 01:40:55', '2022-04-30 01:40:55'),
(7, 'user', '123', NULL, 'lio.r@outlook.com', '2022-04-30 18:09:42', '2022-04-30 18:09:42');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `lista`
--
ALTER TABLE `lista`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `lista`
--
ALTER TABLE `lista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
