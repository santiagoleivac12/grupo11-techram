-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: techram
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `postal_code` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_FK` (`userId`),
  CONSTRAINT `addresses_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'Av. pajarito','Buenos Aires','Buenos Aires',126,1557,1),(2,'calle de por ahi','Capital Federal','Buenos Aires',16,157,2),(3,'av. el paraiso','Pilar','Buenos Aires',1689,1669,3),(4,'av. Cristiania','Rafael Castillo','Buenos Aires',741,1751,4),(5,'Los alamos','Godoy Cruz','Mendoza',598,9668,5),(6,'Las CaÃƒÆ’Ã‚Â±itas','Desamparados','San Juan',458,1699,6),(7,'9 de Julio','Capital Federal','Buenos Aires',487,4508,7),(8,'Eufrates','Rafael Castillo','Buenos Aires',9,1755,8);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Componentes de pc'),(2,'Accesorios'),(3,'Electronica'),(4,'Notebooks'),(5,'Consolas'),(6,'Celulares'),(7,'Conectividad'),(8,'Arma tu PC');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_items_un` (`id`),
  KEY `order_items_FK` (`productId`),
  KEY `order_items_FK_1` (`orderId`),
  CONSTRAINT `order_items_FK` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `order_items_FK_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,3,2),(2,2,5,1),(3,3,1,1),(4,4,8,3),(5,5,10,1),(6,6,3,1),(7,7,2,1),(8,8,4,2),(9,9,7,1),(10,10,6,1);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `state` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_un` (`id`),
  KEY `orders_FK` (`userId`),
  CONSTRAINT `orders_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'Pendiente'),(2,2,'Entregado'),(3,1,'Entregado'),(4,3,'Pendiente'),(5,3,'Pendiente'),(6,4,'Entregado'),(7,5,'Entregado'),(8,6,'Entregado'),(9,7,'Entregado'),(10,8,'Entregado');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(800) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `subcategoryId` int(11) NOT NULL,
  `images` text DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `description` varchar(800) DEFAULT NULL,
  `conectivity` varchar(360) DEFAULT NULL,
  `marca` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `subcategory_FK_1` (`subcategoryId`),
  CONSTRAINT `subcategory_FK_1` FOREIGN KEY (`subcategoryId`) REFERENCES `subcategories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Modulo de memoria SPECTRIX D60G DDR4 RGB',14000,10,1,NULL,50,'Si notÃ¡s que tu computadora tiene bajo rendimiento o que su capacidad no se adapta a tus necesidades de uso, es momento de renovar su memoria RAM. AumentarÃ¡s su productividad y podrÃ¡s trabajar de manera rÃ¡pida y en simultÃ¡neo con mÃºltiples aplicaciones.Con su tecnologÃ­a DDR4, mejorarÃ¡ el desempeÃ±o de tu equipo, ya que opera en 3 y 4 canales, generando mayor fluidez y velocidad en la transferencia de datos. Â¡OptimizÃ¡ al mÃ¡ximo el rendimiento de tu computadora!','asdad','asdad'),(2,'Micro Procesador Amd Ryzen 5 5600g 4.4ghz Am4 16mb C/ Video',35000,5,2,NULL,10,'Clave en el rendimiento de tu computadora de escritorio, ya no tenÃ©s que pensar en cÃ³mo distribuir el tiempo y acciones porque ahora las tareas en simultÃ¡neo son posibles.AMD cuenta con un catÃ¡logo de productos que se adaptan a los requerimientos de todo tipo de usuarios: juegos en lÃ­nea, ediciÃ³n a gran escala, contenido en mÃºltiples plataformas y mÃ¡s.','dddd','amd'),(3,'Teclado Redragon k552w',55555,5,3,NULL,25,'La gran calidad del Redragon Kumara K552, y su precio econÃ³mico lo vuelven un atractivo ideal para que te diviertas frente a la pantalla. Su ergonomÃ­a, su base antidelizante y su rÃ¡pido tiempo de respuesta permite que tus juegos favoritos se sientan mÃ¡s cerca que nunca, al alcance de tus manos.','USB','RGB rojo'),(4,'Motherboard Asus Tuf Gaming Z590-plus Wifi Socket 1200',31000,10,4,NULL,15,'Tarjeta madre para juegos AMD B550 (Ryzen AM4) ATX con PCIe 4.0, doble M.2, 10 fases de poder DrMOS, Intel Wi-Fi 6, 2.5 Gb Ethernet, HDMI, DisplayPort, SATA 6 Gbps, USB 3.2 Gen 2 Type-A y Type -C, puerto ThunderboltÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ 3 y compatibilidad con iluminaciÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³n Aura Sync RGB','Conectores EATX de 4 y 8 contactos','amd'),(5,'onikuma k20',4000,5,3,NULL,5,'ExperimentÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡ la adrenalina de sumergirte en la escena de otra manera! Tener auriculares especÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â­ficos para jugar cambia completamente tu experiencia en cada partida. Con los Onikuma K20 no te perdÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s ningÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âºn detalle y escuchÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡s el audio tal y como fue diseÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â±ado por los creadores. El formato perfecto para vos. Al ser headset vas a poder escuchar tu mÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âºsica preferida, mantener llamadas telefÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³nicas y jugar en lÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â­nea desde tu pc sin perderte ningÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âºn detalle.','Conector jack 3.5mm','rgb led'),(6,'Monitor AOC 27\"',28900,10,3,NULL,8,'Una experiencia visual de calidad Este monitor de 23.8 te va a resultar de gran comodidad para estudiar, trabajar o ver una pelÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â­cula en tus tiempos de ocio. Asimismo, su resoluciÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³n de 1920 x 1080 te permite disfrutar de momentos ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âºnicos gracias a una imagen con gran nitidez.','HDMI','asdadasd'),(7,'Luces Led 10m',1500,NULL,7,NULL,20,'Tira de LED RGB para decorar los mejores lugares de manera multicolor y con efectos. TambiÃ©n podrÃ¡ usarla en exterior, ya que estÃ¡ protegida con una capa resistente de silicona, haciendo posible decorar todo tipo de lugar en la intemperie, ademas de adhesiva, para asÃ­ poder adherirla a cualquier estructura. Este producto viene con su transformador incluido y un controlador, para poder elegir entre los distintos efectos y colores.','adasdasd','LED'),(8,'Tableta digital Wacom INtuos Small',35000,5,5,NULL,3,'Enciende tu imaginaciÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³n con la nueva Intuos Draw. Incluye la tecnologÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â­a de pen tablet lÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â­der de Wacom, software creativo descargable gratuito y cursos de formaciÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³n en lÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â­nea. Independientemente de que tu sueÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â±o sea crear bocetos asombrosos, compartir tu trabajo con amigos o comenzar una carpeta de trabajos, Intuos Draw tiene todo lo que necesitas para comenzar a crear inmediatamente.','USB','aadsda'),(9,'Placa de video MSI GeForce RTX 3080 Ti 12GB',340000,10,6,NULL,6,'VENTUS ofrece un diseÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â±o centrado en el rendimiento que mantiene lo esencial para realizar cualquier tarea. Una disposiciÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³n de triple ventilador capaz colocada en un diseÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â±o industrial rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â­gido permite que esta tarjeta grÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡fica de aspecto elegante se adapte a cualquier construcciÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³n.','DisplayPort(v1.4a)','adsadds'),(10,'Cpu Cooler Xigmatek Windpower 963 Intel 1200 Amd Am4',8000,5,8,NULL,17,'Los tubos de calor tÃ©rmicos ultra eficientes y la tecnologÃ­a HDT patentada junto con las aletas de aluminio de alto rendimiento producen una disipaciÃ³n de calor eficiente y sobresaliente. Los tubos de calor de cobre integrados estÃ¡n conectados directamente a su CPU. La tecnologÃ­a HDT produce mÃ¡s de un 10% mÃ¡s de conductividad tÃ©rmica en comparaciÃ³n con los tradicionales disipadores de calor de cobre.','amd am4','[NULL]'),(15,'Placa de video Nvidia Asus Dual GeForce GTX 16 Series GTX 1650 DUAL-GTX1650-4G 4GB',60000,5,6,NULL,4,'Nvidia es el fabricante líder de placas de video; su calidad asegura una experiencia positiva en el desarrollo del motor gráfico de tu computadora. Además, sus procesadores usan tecnología de punta para que puedas disfrutar de un producto veloz y duradero.\r\n\r\nVelocidad en cada lectura\r\nComo cuenta con 896 núcleos, los cálculos para el procesamiento de gráficos se realizarán de forma simultánea logrando un resultado óptimo del trabajo de la placa. Esto le permitirá ejecutar lecturas dispersas y rápidas de y hacia la GPU.',NULL,NULL),(16,'Placa Video Gigabyte Geforce Rtx3070 Lhr 8gb',230000,5,6,NULL,6,'Velocidad en cada lectura\r\nCuenta con 5888 núcleos, por lo que la interfaz de la placa será algo sorprendente. Este tipo de estructura es apropiado para el procesamiento de tecnologías más complejas y modernas caracterizadas por grandes volúmenes de datos.',NULL,NULL),(17,'Placa De Video Nvidia Zotac Gaming Geforce Rtx3090 24gb',400000,5,6,NULL,2,'ZOTAC GAMING GeForce RTX 3090 Trinidad\r\nZT-A30900D-10P\r\nObtené amplificación con la serie ZOTAC GAMING GeForce RTX™ 30 basada en la arquitectura NVIDIA Ampere. Construida con RT Cores y Tensor Cores mejorados, nuevos multiprocesadores de transmisión y memoria GDDR6X ultrarrápida, ZOTAC GAMING GeForce RTX 3090 Trinity da lugar a una experiencia de juego amplificada con ultrafidelidad de gráficos.',NULL,NULL),(18,'Placa Video Amd Radeon Rx 6700 Xt Gaming Oc 12g Hdmi Dp',260000,5,6,NULL,8,'Con tecnología AMD RDNA  2 Radeon  RX 6700 XT\r\nIntegrado con interfaz de memoria GDDR6 de 192 bits de\r\n12 GB WINDFORCE 3X Sistema de refrigeración con ventiladores giratorios alternativos\r\nRefrigeración de la pantalla\r\nNano lubricante de grafeno\r\nRGB Fusion 2.0\r\nPlaca trasera metálica de protección',NULL,'amd'),(19,'Placa De Video Amd Asus Rx 6600 8gb Radeon Dual Megasoft',145000,5,6,NULL,10,'AMD es un fabricante estadounidense de placas de video, por su tecnología se ha destacado en crear procesadores de alta gama que permiten un excelente funcionamiento del motor gráfico de tu computadora.\r\n\r\nVelocidad en cada lectura\r\nComo cuenta con 2048 núcleos, los cálculos para el procesamiento de gráficos se realizarán de forma simultánea logrando un resultado óptimo del trabajo de la placa. Esto le permitirá ejecutar lecturas dispersas y rápidas de y hacia la GPU.\r\n',NULL,'amd'),(20,'Monitor Gaming LG 32 32gn500 165hz Full Hd Ultragear G-sync',78000,5,12,NULL,8,'\r\n• DISEÑADO PARA LA VICTORIA\r\nEl LG UltraGear™ Gaming Monitor es un monitor gamer super potente con funciones de alto rendimiento, que se adapta a cualquier juego exigente.\r\n\r\n• MOVIMIENTO SIN DISTORSIÓN CON RADEON FREESYNC\r\nEquipado con tecnología Radeon FreeSync, proporciona un movimiento suave sin distorsión ni fragmentación gracias a la tecnología Adaptive Sync.\r\n\r\n• SUMÉRGETE EN EL COMBATE REAL CON TRUE COLORS\r\nCompatible con HDR10 con sRGB 99%, lo que permite una inmersión visual realista con colores y contraste más ricos, como lo pensaron los desarrolladores.',NULL,NULL),(21,'Samsung Monitor C24T550FDR 24´´ Full HD LED Curvo 75Hz',32000,10,12,NULL,8,'Curvatura óptima:\r\nPresentamos la curva más atrevida jamás lograda. Este hito, nacido de años de innovación incesante, cambia la forma de la pantalla visual y es pionero en el futuro de la tecnología de monitores.\r\n\r\nDiseño minimalista:\r\nDiseño de nueva generación. La sorprendente estética de la pantalla prácticamente sin bordes se ve reforzada por una parte trasera con textura de tela y un soporte de metal delgado de primera calidad. El resultado es un monitor que no solo llama la atención, sino que también complementa cualquier interior.\r\n\r\nLo que quieren los jugadores:\r\nEstas imágenes impecables se combinan con el modo de juego y la famosa curva 1000R para una inmersión intensamente realista.',NULL,NULL),(22,'Teclado gamer bluetooth Corsair K57 QWERTY Rubber Dome inglés US color negro con luz RGB',16999,5,1,NULL,20,'Distinción a todo color\r\nSu retroiluminación le da un toque diferente a tu equipo y resalta su composición cuando es utilizado en espacios poco iluminados.\r\n\r\nTecnología antighosting\r\nEste dispositivo tiene teclas antighosting. Esta cualidad es indispensable si requerís de un uso intensivo del periférico. Gracias a esto podrás evitar fallas al tocar varias teclas al mismo tiempo.',NULL,NULL),(23,'Teclado Rgb Led De Una Mano Para Videojuegos Xsr',35000,5,3,NULL,15,'Diseño ergonómico para jugadores profesionales. Llaves mecánicas de larga duración\r\nLa tecnología RGBA permite la personalización a todo color de la retroiluminación. 100% anti-efecto fantasma con todas las teclas en USB.\r\nEl teclado viene con 5 modos de retroiluminación preprogramados y permite 5 perfiles de retroiluminación personalizados.\r\nLas teclas funcionales y la retroiluminación principal se pueden personalizar con los controladores que vienen con el teclado.\r\nEl teclado cambia al modo de suspensión después de estar inactivo durante 10 minutos. Presiona cualquier tecla para reactivar el teclado.',NULL,NULL),(24,'Teclado Gamer Gigabyte Aorus K1 Rgb',14000,5,3,NULL,10,'El estilo Neonpunk emana en la oscuridad del destello de metales de alta calidad, mostrando una estética futurista en la oscuridad de la noche.\r\nHa llegado la nueva era de los deportes electrónicos.\r\n\r\nLa tecla Cherry RED proporciona una respuesta de tecla superior y una fuerza de actuación optimizada. La distancia de actuación de tecla reducida de 2 mm mejora el tiempo de respuesta del teclado mientras permanece silencioso durante el funcionamiento.',NULL,NULL),(25,'Microprocesador Intel I3-10100 6MB 3.60 GHz Socket 1200 - 10° Gen',20500,5,2,NULL,15,'Rendimiento\r\nCantidad de núcleos 4\r\nCantidad de subprocesos 8\r\nFrecuencia básica del procesador 3,60 GHz\r\nFrecuencia turbo máxima 4,30 GHz\r\nCaché 6 MB Intel® Smart Cache\r\nVelocidad del bus 8 GT/s\r\nTDP 65 W',NULL,'intel'),(26,'MICROPROCESADOR INTEL CORE I9 10900 COMETLAKE 5.2 GHZ 20MB S1200',80000,10,2,NULL,6,'Siendo el Tope de línea de la Gama intel, el i9 10900, tiene un rendimiento nunca antes visto, con un consumo energético Increíble.\r\n\r\nCantidad de núcleos 10\r\nCantidad de subprocesos 20\r\nFrecuencia básica del procesador 2,80 GHz\r\nFrecuencia turbo máxima 5,20 GHz\r\n',NULL,'intel'),(27,'Micro Procesador  AMD RYZEN 7 5700G AM4 WITH WRAITH STEALTH',55400,5,2,NULL,10,'El procesador para computadoras de escritorio AMD Ryzen™ 7 5700G te mete rápido en el combate gracias a la tarjeta gráfica más veloz que se puede encontrar en un producto de este tipo1. Juega los mejores títulos, de forma fluida, en 1080p, con ocho núcleos, 16 subprocesos, velocidades turbo de hasta 4,6 GHz2, 20 MB de caché total y ocho unidades de procesamiento gráfico que llegan a 2 GHz',NULL,'amd'),(28,'Microprocesador AMD Ryzen™ 9 5900X 4.8GHz AM4',94000,5,2,NULL,15,'AMD \"Zen 3\" Core Architecture\r\nLos núcleos más rápidos del mundo para los jugadores de PC.\r\nTecnología AMD StoreMI\r\nCSoftware que combina la velocidad de SSD con la capacidad de disco duro en una sola unidad rápida y fácil de administrar, gratuitamente con la placa madre AMD Serie 400.',NULL,'amd'),(29,'Memorias Gamers Ddr4 16gb 3600 Mhz',22900,5,1,NULL,15,'La memoria VENGEANCE LPX se ha diseñado para overclocking de alto rendimiento. El disipador de calor está hecho de aluminio puro, lo cual permite una disipación térmica más rápida, mientras que el circuito está diseñado especialmente para obtener el mayor rendimiento, mantener a raya el calor y proporcionar una capacidad superior para incrementar el overclocking. Cada circuito integrado está seleccionado individualmente para el máximo potencial de rendimiento.',NULL,NULL),(30,'Memoria Ram Gigabyte Aorus Rgb Gamer Gray 16gb 2x8gb 4400mhz',27000,5,1,NULL,10,'Potenciá tu PC\r\nCon su tecnología DDR4, mejorará el desempeño de tu equipo, ya que opera en 3 y 4 canales, generando mayor fluidez y velocidad en la transferencia de datos. ¡Optimizá al máximo el rendimiento de tu computadora!',NULL,NULL),(31,'Motherboard Asus Rog Stix B450-f Gaming Ii Am4 Amd Mineria',28870,5,4,NULL,15,'RENDIMIENTO MEJORADO\r\nCon un diseño de potencia robusto para impulsar procesadores Ryzen de múltiples núcleos, además de opciones de refrigeración, almacenamiento, conectividad y audio para una amplia gama de hardware, ROG Strix B450-F Gaming II ofrece a los jugadores todo lo que necesitan para un presupuesto o una construcción de alto rendimiento.',NULL,'amd'),(32,'Motherboard Asus Prime Z590-a Intel Lga 1200 10 Y 11 Gen',33900,5,4,NULL,8,'Tarjeta madre Intel® Z590 (LGA 1200) ATX con PCIe® 4.0, tres puertos M.2, 16 fases de poder DrMOS, HDMI®, DisplayPort™, SATA 6 Gbps, Ethernet Intel® 2.5 Gb, USB 3.2 Gen 2x2 Tipo-C® y USB 3.2 Gen 1 Tipo-C® en el panel frontal, compatibilidad con Thunderbolt™ 4 e iluminación Aura Sync RGB\r\n',NULL,'intel'),(33,'Mother Am4 Ryzen Hdmi Placa Madre Ddr4 Amd',10800,5,4,NULL,10,'Placa Madre Am4 Ryzen Hdmi Mother Ddr4. Diseño de PCB de tela de vidrio de alta densidad que reduce los espacios entre las capas de PCB para proteger la placa base contra cortocircuitos eléctricos causados por la humedad.\r\n\r\nEl nuevo PCB Sapphire Black representa una calidad sólida como una roca y le da a la placa base un toque más misterioso. Esta placa base es compatible con Triple Monitor. Puede elegir hasta tres interfaces de pantalla desde la E/S trasera para conectar monitores y usarlos simultáneamente sin instalar otra tarjeta gráfica',NULL,'amd'),(34,'Placa Madre Para Gaming Msi | Ddr4, M.2, Usb, Hdmi, Amd,',108000,5,4,NULL,15,'Placa base para juegos MSI MPG B550 Gaming Plus (AMD AM4, DDR4, PCIe 4.0, SATA 6Gb / s, M.2, USB 3.2 Gen 2, HDMI / DP, ATX)',NULL,'amd'),(35,'Memoria Ram Pc Kingston Hyper X Predator Ddr4 Kit 16gb 2 X 8gb 2933mhz Rgb',22000,5,1,NULL,8,'Dale al sistema el estilo RGB brillante y el rendimiento necesarios para estar en lo más alto de la cadena alimentaria con la HyperX Predator DDR4 RGB. Configúrala fácilmente y presume de tener un aspecto exclusivo gracias a la tecnología de sincronización infrarroja de HyperX, que no necesita cables. La memoria Predator DDR4 RGB permanece fría y con un aspecto genial, gracias al disipador de calor negro agresivo diseñado para complementar su impresionante visualización de luces.',NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_images`
--

DROP TABLE IF EXISTS `products_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(100) NOT NULL,
  `productId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_images_FK` (`productId`),
  CONSTRAINT `products_images_FK` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_images`
--

LOCK TABLES `products_images` WRITE;
/*!40000 ALTER TABLE `products_images` DISABLE KEYS */;
INSERT INTO `products_images` VALUES (1,'producto11.png',1),(2,'producto3.jpg',2),(3,'producto4.png',3),(4,'producto5(2).jpg',4),(5,'productoAuriculares.jpeg',5),(6,'producto8.jpg',6),(7,'producto9.jpg',7),(8,'producto10.jpg',8),(9,'producto1.png',9),(10,'producto12.png',10),(11,'default-image.png',11),(12,'1648475625257_img_.jpg',15),(13,'1648476317408_img_.jpg',16),(14,'1648476515266_img_.jpg',17),(15,'1648476973583_img_.jpg',18),(16,'1648477292753_img_.jpg',19),(17,'1648477612720_img_.jpg',20),(18,'1648477971366_img_.jpg',21),(20,'1648478709733_img_.jpg',23),(21,'1648478919404_img_.jpg',24),(22,'1648479207281_img_.jpg',25),(23,'1648479454033_img_.jpg',26),(24,'1648480501448_img_.jpg',27),(25,'1648480948229_img_.jpg',28),(26,'1648481251552_img_.jpg',29),(27,'1648481422652_img_.jpg',30),(28,'1648481732312_img_.jpg',31),(29,'1648481904615_img_.jpg',32),(30,'1648482801025_img_.jpg',33),(31,'1648482925705_img_.jpg',34),(32,'1648483185794_img_.jpg',35),(33,'1648483331692_img_.jpg',22);
/*!40000 ALTER TABLE `products_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `categoryId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `categoria_id` (`categoryId`),
  CONSTRAINT `categoria_id` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Memoria ram',1),(2,'Microprocesadores',1),(3,'Perifericos',2),(4,'Motherboard',1),(5,'dibujo',3),(6,'Placas de video',1),(7,'otros',3),(8,'cooler',1),(9,'Unidad de almacenamiento',1),(10,'Gabinetes',1),(11,'Fuentes',1),(12,'Monitores',1),(13,'Samsung',6),(14,'Xiaomi',6),(15,'Motorola',6),(16,'iPhone',6);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(60) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `pass` varchar(70) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `rol` int(2) NOT NULL DEFAULT 0,
  `phone` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Santiago','Leiva','santyleiva53@gmail.com','Hola1234','user.png',0,'11502365896'),(2,'Brian','Garcia','garciabrianalejandro@gmail.com','hola1234','user.png',1,'1155665896'),(3,'Ricardo','Juturi','ricardojuturi53@gmail.com','hola12345','user.png',1,'112369874'),(4,'Micaela','Sosa','micaesosa556@gmail.com','hola4321','user.png',1,'2612531016'),(5,'Mara','Leiva','maleiva53@gmail.com','hola43211','user.png',0,'2263598455'),(6,'Celeste','Otazo','celesteotazo53@gmail.com','hola54321','user.png',0,'1536985235'),(7,'Lautaro','Bozzolo','lautarobozzolo53@gmail.com','hola1234567','user.png',0,'1537896525'),(8,'Hola','Decime','queanda@gmail.com','hola1234567','user.png',0,'1537896525'),(9,'pepe','argento','pepe@gmail.com','hola1','user.png',0,'2256355874'),(10,'Cristian','arguello','cris@gmail.com','$2a$10$AuDBarjU29o3wNCnR8yaJ.unewX1g9eDSYxfE5nfW4AeqPzzT2ZXa','default-image.png',0,NULL),(11,'Admin','Admin','admin@gmail.com','$2a$10$6MUWPZl4Ucf9PJnuOHjyL.Fkq/w47zScsrPPjx25B0/SuOaAjMj9q','default-image.png',0,NULL),(12,'cleo','garcia','cleooo@gmail.com','$2a$10$/C6uQd2xbNOhHmgzsy1KIe4HHSVCC17rOeIz9z7hAo88YfdvbcOS6','default-image.png',1,NULL),(13,'ricardo','juturi','ricardo@gmail.com','$2a$10$Xm4rhMvzc3GawK3TcfD00uS.nT99XZQmr2RF23EQtRtEzdOBx73Ca','default-image.png',1,NULL),(14,'ale','ale','ale@gmail.com','$2a$10$3HhVYyvuFoY2zl8HVP0tqe2UqZjYJDuxsozFmtdzHZssJ10q91KTu','default-image.png',1,'1155997722');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'techram'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-28 21:20:04
