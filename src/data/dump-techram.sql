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
INSERT INTO `addresses` VALUES (1,'Av. pajarito','Buenos Aires','Buenos Aires',126,1557,1),(2,'calle de por ahi','Capital Federal','Buenos Aires',16,157,2),(3,'av. el paraiso','Pilar','Buenos Aires',1689,1669,3),(4,'av. Cristiania','Rafael Castillo','Buenos Aires',741,1751,4),(5,'Los alamos','Godoy Cruz','Mendoza',598,9668,5),(6,'Las CaÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â±itas','Desamparados','San Juan',458,1699,6),(7,'9 de Julio','Capital Federal','Buenos Aires',487,4508,7),(8,'Eufrates','Rafael Castillo','Buenos Aires',9,1755,8);
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
INSERT INTO `order_items` VALUES (1,1,3,2),(2,2,5,1),(4,4,8,3),(5,5,10,1),(6,6,3,1),(7,7,2,1),(8,8,4,2),(9,9,7,1),(10,10,6,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'Micro Procesador Amd Ryzen 5 5600g 4.4ghz Am4 16mb C/ Video',35000,5,1,NULL,10,'Clave en el rendimiento de tu computadora de escritorio, ya no tendras que pensar en como distribuir el tiempo y acciones porque ahora las tareas en simultaneo son posibles.AMD cuenta con un catalogo de productos que se adaptan a los requerimientos de todo tipo de usuarios: juegos en linea, eficiencia a gran escala, contenido en multiples plataformas y mas.','dddd','amd'),(3,'Teclado Redragon k552w',55555,5,1,NULL,25,'La gran calidad del Redragon Kumara K552, y su precio economico lo vuelven un atractivo ideal para que te diviertas frente a la pantalla. Su ergonomía, su base antidelizante y su rapido tiempo de respuesta permite que tus juegos favoritos se sientan más cerca que nunca, al alcance de tus manos.','USB','RGB rojo'),(4,'Motherboard Asus Tuf Gaming Z590-plus Wifi Socket 1200',31000,10,1,NULL,15,'La ASUS TUF GAMING Z590-PLUS WIFI combina los elementos esenciales de los nuevos procesadores de Intel® con funciones específicas de gaming y una durabilidad comprobada. Equipada con componentes de grado militar, soluciones de alimentación optimizadas y opciones de refrigeración completas, esta tarjeta madre ofrece una estabilidad inquebrantable durante las sesiones de juego más exigentes. Estéticamente, la TUF GAMING Z590-PLUS WIFI luce el nuevo logotipo de la serie y elementos geométricos que reflejan la fiabilidad característica de los dispositivos TUF Gaming.','Conectores EATX de 4 y 8 contactos','amd'),(5,'onikuma k20',4000,5,1,NULL,5,'¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida. Con los Onikuma K20 no te perdés ningún detalle y escuchás el audio tal y como fue diseñado por los creadores.\r\n  El diseño over-ear brinda una comodidad insuperable gracias a sus suaves almohadillas. Al mismo tiempo, su sonido envolvente del más alto nivel se convierte en el protagonista de la escena.','Conector jack 3.5mm','rgb led'),(6,'Monitor AOC 27\"',28900,10,3,NULL,8,'Una experiencia visual de calidad Este monitor de 23.8 te va a resultar de gran comodidad para estudiar, trabajar o ver una pelÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­cula en tus tiempos de ocio. Asimismo, su resoluciÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³n de 1920 x 1080 te permite disfrutar de momentos ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âºnicos gracias a una imagen con gran nitidez.','HDMI','asdadasd'),(7,'Luces Led 10m',1500,NULL,7,NULL,20,'Tira de LED RGB para decorar los mejores lugares de manera multicolor y con efectos. TambiÃƒÂ©n podrÃƒÂ¡ usarla en exterior, ya que estÃƒÂ¡ protegida con una capa resistente de silicona, haciendo posible decorar todo tipo de lugar en la intemperie, ademas de adhesiva, para asÃƒÂ­ poder adherirla a cualquier estructura. Este producto viene con su transformador incluido y un controlador, para poder elegir entre los distintos efectos y colores.','adasdasd','LED'),(8,'Tableta digital Wacom INtuos Small',35000,5,1,NULL,3,'Enciende tu imaginación con la nueva Intuos Draw. Incluye la tecnología de pen tablet líder de Wacom, software creativo descargable gratuito y cursos de formación en línea. Independientemente de que tu sueño sea crear bocetos asombrosos, compartir tu trabajo con amigos o comenzar una carpeta de trabajos, Intuos Draw tiene todo lo que necesitas para comenzar a crear inmediatamente.','USB','aadsda'),(9,'Placa de video MSI GeForce RTX 3080 Ti 12GB',340000,10,1,NULL,6,'Nvidia es el fabricante líder de placas de video; su calidad asegura una experiencia positiva en el desarrollo del motor gráfico de tu computadora. Además, sus procesadores usan tecnología de punta para que puedas disfrutar de un producto veloz y duradero.\r\nCuenta con 10240 núcleos, por lo que la interfaz de la placa será algo sorprendente. Este tipo de estructura es apropiado para el procesamiento de tecnologías más complejas y modernas caracterizadas por grandes volúmenes de datos. \r\nCriterio fundamental a la hora de elegir una placa de video, su resolución de 7680x4320 no te defraudará. La decodificación de los píxeles en tu pantalla te harán ver hasta los detalles más ínfimos en cada ilustración.','DisplayPort(v1.4a)','adsadds'),(10,'Cpu Cooler Xigmatek Windpower 963 Intel 1200 Amd Am4',8000,5,1,NULL,17,'Los tubos de calor térmicos ultra eficientes y la tecnología HDT patentada junto con las aletas de aluminio de alto rendimiento producen una disipación de calor eficiente y sobresaliente. Los tubos de calor de cobre integrados están conectados directamente a su CPU. La tecnología HDT produce más de un 10% más de conductividad térmica en comparación con los tradicionales disipadores de calor de cobre.','amd am4','[NULL]'),(15,'Placa de video Nvidia Asus Dual GeForce GTX 16 Series GTX 1650 DUAL-GTX1650-4G 4GB',60000,NULL,6,NULL,4,'Nvidia es el fabricante lÃ­der de placas de video; su calidad asegura una experiencia positiva en el desarrollo del motor grÃ¡fico de tu computadora. AdemÃ¡s, sus procesadores usan tecnologÃ­a de punta para que puedas disfrutar de un producto veloz y duradero.\r\n\r\nVelocidad en cada lectura\r\nComo cuenta con 896 nÃºcleos, los cÃ¡lculos para el procesamiento de grÃ¡ficos se realizarÃ¡n de forma simultÃ¡nea logrando un resultado Ã³ptimo del trabajo de la placa. Esto le permitirÃ¡ ejecutar lecturas dispersas y rÃ¡pidas de y hacia la GPU.',NULL,NULL),(16,'Placa Video Gigabyte Geforce Rtx3070 Lhr 8gb',230000,NULL,6,NULL,6,'Velocidad en cada lectura\r\nCuenta con 5888 nÃºcleos, por lo que la interfaz de la placa serÃ¡ algo sorprendente. Este tipo de estructura es apropiado para el procesamiento de tecnologÃ­as mÃ¡s complejas y modernas caracterizadas por grandes volÃºmenes de datos.',NULL,NULL),(17,'Placa De Video Nvidia Zotac Gaming Geforce Rtx3090 24gb',400000,NULL,6,NULL,2,'ZOTAC GAMING GeForce RTX 3090 Trinidad\r\nZT-A30900D-10P\r\nObtenÃ© amplificaciÃ³n con la serie ZOTAC GAMING GeForce RTXâ„¢ 30 basada en la arquitectura NVIDIA Ampere. Construida con RT Cores y Tensor Cores mejorados, nuevos multiprocesadores de transmisiÃ³n y memoria GDDR6X ultrarrÃ¡pida, ZOTAC GAMING GeForce RTX 3090 Trinity da lugar a una experiencia de juego amplificada con ultrafidelidad de grÃ¡ficos.',NULL,NULL),(18,'Placa Video Amd Radeon Rx 6700 Xt Gaming Oc 12g Hdmi Dp',260000,5,6,NULL,8,'Con tecnologÃ­a AMD RDNA  2 Radeon  RX 6700 XT\r\nIntegrado con interfaz de memoria GDDR6 de 192 bits de\r\n12 GB WINDFORCE 3X Sistema de refrigeraciÃ³n con ventiladores giratorios alternativos\r\nRefrigeraciÃ³n de la pantalla\r\nNano lubricante de grafeno\r\nRGB Fusion 2.0\r\nPlaca trasera metÃ¡lica de protecciÃ³n',NULL,'amd'),(19,'Placa De Video Amd Asus Rx 6600 8gb Radeon Dual Megasoft',145000,5,1,NULL,10,'AMD es un fabricante estadounidense de placas de video, por su tecnología se ha destacado en crear procesadores de alta gama que permiten un excelente funcionamiento del motor gráfico de tu computadora.\r\nVelocidad en cada lectura\r\nComo cuenta con 2304 núcleos, los cálculos para el procesamiento de gráficos se realizarán de forma simultánea logrando un resultado óptimo del trabajo de la placa. Esto le permitirá ejecutar lecturas dispersas y rápidas de y hacia la GPU.\r\nCalidad de imagen\r\nCriterio fundamental a la hora de elegir una placa de video, su resolución de 7680x4320 no te defraudará. La decodificación de los píxeles en tu pantalla te harán ver hasta los detalles más ínfimos en cada ilustración. \r\n',NULL,'amd'),(20,'Microprocesador Intel I7-11700f 16mb 4.9ghz 8 Cores 11va Gen',58799,10,4,NULL,50,'Logre más de lo que le interesa con un procesador Intel Core de 11° Generación\r\nLos procesadores Intel Core de 11° Generación redefinen el desempeño de CPU de Intel para computadoras portátiles y desktop. Nuevas arquitecturas de núcleos y de gráficos, mejora de desempeño basada en IA, la mejor conectividad con y sin cable de su clase y las funciones de ajuste avanzadas, entregan mayores niveles de potencia y flujo para apoyar sus aspiraciones.',NULL,'intel'),(21,'Samsung Monitor C24T550FDR 24Â´Â´ Full HD LED Curvo 75Hz',32000,NULL,12,NULL,8,'Curvatura Ã³ptima:\r\nPresentamos la curva mÃ¡s atrevida jamÃ¡s lograda. Este hito, nacido de aÃ±os de innovaciÃ³n incesante, cambia la forma de la pantalla visual y es pionero en el futuro de la tecnologÃ­a de monitores.\r\n\r\nDiseÃ±o minimalista:\r\nDiseÃ±o de nueva generaciÃ³n. La sorprendente estÃ©tica de la pantalla prÃ¡cticamente sin bordes se ve reforzada por una parte trasera con textura de tela y un soporte de metal delgado de primera calidad. El resultado es un monitor que no solo llama la atenciÃ³n, sino que tambiÃ©n complementa cualquier interior.\r\n\r\nLo que quieren los jugadores:\r\nEstas imÃ¡genes impecables se combinan con el modo de juego y la famosa curva 1000R para una inmersiÃ³n intensamente realista.',NULL,NULL),(22,'Teclado gamer bluetooth Corsair K57 QWERTY Rubber Dome inglÃ©s US color negro con luz RGB',16999,NULL,1,NULL,20,'DistinciÃ³n a todo color\r\nSu retroiluminaciÃ³n le da un toque diferente a tu equipo y resalta su composiciÃ³n cuando es utilizado en espacios poco iluminados.\r\n\r\nTecnologÃ­a antighosting\r\nEste dispositivo tiene teclas antighosting. Esta cualidad es indispensable si requerÃ­s de un uso intensivo del perifÃ©rico. Gracias a esto podrÃ¡s evitar fallas al tocar varias teclas al mismo tiempo.',NULL,NULL),(23,'Teclado Rgb Led De Una Mano Para Videojuegos Xsr',35000,NULL,3,NULL,15,'DiseÃ±o ergonÃ³mico para jugadores profesionales. Llaves mecÃ¡nicas de larga duraciÃ³n\r\nLa tecnologÃ­a RGBA permite la personalizaciÃ³n a todo color de la retroiluminaciÃ³n. 100% anti-efecto fantasma con todas las teclas en USB.\r\nEl teclado viene con 5 modos de retroiluminaciÃ³n preprogramados y permite 5 perfiles de retroiluminaciÃ³n personalizados.\r\nLas teclas funcionales y la retroiluminaciÃ³n principal se pueden personalizar con los controladores que vienen con el teclado.\r\nEl teclado cambia al modo de suspensiÃ³n despuÃ©s de estar inactivo durante 10 minutos. Presiona cualquier tecla para reactivar el teclado.',NULL,NULL),(24,'Teclado Gamer Gigabyte Aorus K1 Rgb',14000,NULL,3,NULL,10,'El estilo Neonpunk emana en la oscuridad del destello de metales de alta calidad, mostrando una estÃ©tica futurista en la oscuridad de la noche.\r\nHa llegado la nueva era de los deportes electrÃ³nicos.\r\n\r\nLa tecla Cherry RED proporciona una respuesta de tecla superior y una fuerza de actuaciÃ³n optimizada. La distancia de actuaciÃ³n de tecla reducida de 2 mm mejora el tiempo de respuesta del teclado mientras permanece silencioso durante el funcionamiento.',NULL,NULL),(25,'Microprocesador Intel I3-10100 6MB 3.60 GHz Socket 1200 - 10° Gen',20500,5,1,NULL,15,'Productividad y entretenimiento, todo disponible en tu computadora de escritorio. La superioridad tecnológica de INTEL es un beneficio para todo tipo de profesionales. Asegura el mejor rendimiento de las aplicaciones, de la transferencia de datos y la conexión con otros elementos tecnológicos.\r\nNúcleos: el corazón del procesador\r\nEn este producto, encontrarás los núcleos, que son los encargados de ejecutar las instrucciones y actividades que le asignás a tu dispositivo. Estos tienen relación directa con dos elementos: los hilos y el modelo. Por lo tanto, a la hora de elegir un procesador, es importante que valores los tres en su conjunto.',NULL,'intel'),(26,'MICROPROCESADOR INTEL CORE I9 10900 COMETLAKE 5.2 GHZ 20MB S1200',80000,10,1,NULL,6,'Productividad y entretenimiento, todo disponible en tu computadora de escritorio. La superioridad tecnológica de INTEL es un beneficio para todo tipo de profesionales. Asegura el mejor rendimiento de las aplicaciones, de la transferencia de datos y la conexión con otros elementos tecnológicos.\r\nNúcleos: el corazón del procesador\r\nEn este producto, encontrarás los núcleos, que son los encargados de ejecutar las instrucciones y actividades que le asignás a tu dispositivo. Estos tienen relación directa con dos elementos: los hilos y el modelo. Por lo tanto, a la hora de elegir un procesador, es importante que valores los tres en su conjunto.\r\n',NULL,'intel'),(27,'Micro Procesador  AMD RYZEN 7 5700G AM4 WITH WRAITH STEALTH',55400,5,1,NULL,10,'Clave en el rendimiento de tu computadora de escritorio, ya no tenés que pensar en cómo distribuir el tiempo y acciones porque ahora las tareas en simultáneo son posibles.\r\nAMD cuenta con un catálogo de productos que se adaptan a los requerimientos de todo tipo de usuarios: juegos en línea, edición a gran escala, contenido en múltiples plataformas y más.',NULL,'amd'),(28,'Microprocesador AMD Ryzen 9 5900X 4.8GHz AM4',94000,5,1,NULL,15,'Clave en el rendimiento de tu computadora de escritorio, ya no tenés que pensar en cómo distribuir el tiempo y acciones porque ahora las tareas en simultáneo son posibles.\r\nAMD cuenta con un catálogo de productos que se adaptan a los requerimientos de todo tipo de usuarios: juegos en línea, edición a gran escala, contenido en múltiples plataformas y más.\r\n\r\nNúcleos: el corazón del procesador\r\nEn este producto, encontrarás los núcleos, que son los encargados de ejecutar las instrucciones y actividades que le asignás a tu dispositivo. Estos tienen relación directa con dos elementos: los hilos y el modelo. Por lo tanto, a la hora de elegir un procesador, es importante que valores los tres en su conjunto.',NULL,'amd'),(29,'Motherboard MSI Z590 MEG UNIFY 1200',56298,10,4,NULL,50,'Admite procesadores Intel Core de 10a generación, de 11a generación, Pentium Gold y Celeron.\r\n -Socket : LGA1200\r\n- Chipset : Intel Z590 Chipset\r\n- Fuente : ATX\r\n- Memoria : 4 x DIMM, Max. 128GB, DDR4 2133/ 2666/ 2933/ 3200 MHz\r\n',NULL,'intel'),(30,'Memoria Ram Gigabyte Aorus Rgb Gamer Gray 16gb 2x8gb 4400mhz',27000,NULL,1,NULL,10,'PotenciÃ¡ tu PC\r\nCon su tecnologÃ­a DDR4, mejorarÃ¡ el desempeÃ±o de tu equipo, ya que opera en 3 y 4 canales, generando mayor fluidez y velocidad en la transferencia de datos. Â¡OptimizÃ¡ al mÃ¡ximo el rendimiento de tu computadora!',NULL,NULL),(31,'Motherboard Asus Rog Stix B450-f Gaming Ii Am4 Amd Mineria',28870,5,1,NULL,15,'ROG Strix B450-F Gaming II ofrece todos los elementos esenciales necesarios para una construcción bien equilibrada. Diseñado para manejar los últimos procesadores AMD Ryzen ™ de tercera generación, ROG Strix B450-F Gaming II presenta una entrega de potencia mejorada, diseño térmico optimizado y memoria DDR4 más estable. BIOS FlashBack ™ facilita la actualización para dar una ventaja a la construcción de cualquier sueño, y el software ROG intuitivo garantiza una experiencia de juego superior.',NULL,'amd'),(32,'Motherboard Asus Prime Z590-a Intel Lga 1200 10 Y 11 Gen',33900,5,4,NULL,8,'Tarjeta madre IntelÂ® Z590 (LGA 1200) ATX con PCIeÂ® 4.0, tres puertos M.2, 16 fases de poder DrMOS, HDMIÂ®, DisplayPortâ„¢, SATA 6 Gbps, Ethernet IntelÂ® 2.5 Gb, USB 3.2 Gen 2x2 Tipo-CÂ® y USB 3.2 Gen 1 Tipo-CÂ® en el panel frontal, compatibilidad con Thunderboltâ„¢ 4 e iluminaciÃ³n Aura Sync RGB\r\n',NULL,'intel'),(33,'Mother Am4 Ryzen Hdmi Placa Madre Ddr4 Amd',10800,5,4,NULL,10,'Placa Madre Am4 Ryzen Hdmi Mother Ddr4. DiseÃ±o de PCB de tela de vidrio de alta densidad que reduce los espacios entre las capas de PCB para proteger la placa base contra cortocircuitos elÃ©ctricos causados por la humedad.\r\n\r\nEl nuevo PCB Sapphire Black representa una calidad sÃ³lida como una roca y le da a la placa base un toque mÃ¡s misterioso. Esta placa base es compatible con Triple Monitor. Puede elegir hasta tres interfaces de pantalla desde la E/S trasera para conectar monitores y usarlos simultÃ¡neamente sin instalar otra tarjeta grÃ¡fica',NULL,'amd'),(34,'Placa Madre Para Gaming Msi | Ddr4, M.2, Usb, Hdmi, Amd,',108000,5,4,NULL,15,'Placa base para juegos MSI MPG B550 Gaming Plus (AMD AM4, DDR4, PCIe 4.0, SATA 6Gb / s, M.2, USB 3.2 Gen 2, HDMI / DP, ATX)',NULL,'amd'),(35,'Memoria Ram Pc Kingston Hyper X Predator Ddr4 Kit 16gb 2 X 8gb 2933mhz Rgb',22000,NULL,1,NULL,8,'Dale al sistema el estilo RGB brillante y el rendimiento necesarios para estar en lo mÃ¡s alto de la cadena alimentaria con la HyperX Predator DDR4 RGB. ConfigÃºrala fÃ¡cilmente y presume de tener un aspecto exclusivo gracias a la tecnologÃ­a de sincronizaciÃ³n infrarroja de HyperX, que no necesita cables. La memoria Predator DDR4 RGB permanece frÃ­a y con un aspecto genial, gracias al disipador de calor negro agresivo diseÃ±ado para complementar su impresionante visualizaciÃ³n de luces.',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_images`
--

LOCK TABLES `products_images` WRITE;
/*!40000 ALTER TABLE `products_images` DISABLE KEYS */;
INSERT INTO `products_images` VALUES (2,'producto3.jpg',2),(3,'producto4.png',3),(4,'producto5(2).jpg',4),(5,'productoAuriculares.jpeg',5),(6,'producto8.jpg',6),(7,'producto9.jpg',7),(8,'producto10.jpg',8),(9,'producto1.png',9),(10,'producto12.png',10),(11,'default-image.png',11),(12,'1648475625257_img_.jpg',15),(13,'1648476317408_img_.jpg',16),(14,'1648476515266_img_.jpg',17),(15,'1648476973583_img_.jpg',18),(16,'1648477292753_img_.jpg',19),(18,'1648477971366_img_.jpg',21),(20,'1648478709733_img_.jpg',23),(21,'1648478919404_img_.jpg',24),(22,'1648479207281_img_.jpg',25),(23,'1648479454033_img_.jpg',26),(24,'1648480501448_img_.jpg',27),(25,'1648480948229_img_.jpg',28),(27,'1648481422652_img_.jpg',30),(28,'1648481732312_img_.jpg',31),(29,'1648481904615_img_.jpg',32),(30,'1648482801025_img_.jpg',33),(31,'1648482925705_img_.jpg',34),(32,'1648483185794_img_.jpg',35),(33,'1648483331692_img_.jpg',22),(35,'1648567744536_img_.jpg',20),(36,'1648568181507_img_.jpg',29);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Santiago','Leiva','santyleiva53@gmail.com','Hola1234','user.png',0,'11502365896'),(2,'Brian','Garcia','garciabrianalejandro@gmail.com','hola1234','user.png',1,'1155665896'),(3,'Ricardo','Juturi','ricardojuturi53@gmail.com','hola12345','user.png',1,'112369874'),(4,'Micaela','Sosa','micaesosa556@gmail.com','hola4321','user.png',1,'2612531016'),(5,'Mara','Leiva','maleiva53@gmail.com','hola43211','user.png',0,'2263598455'),(6,'Celeste','Otazo','celesteotazo53@gmail.com','hola54321','user.png',0,'1536985235'),(7,'Lautaro','Bozzolo','lautarobozzolo53@gmail.com','hola1234567','user.png',0,'1537896525'),(8,'Hola','Decime','queanda@gmail.com','hola1234567','user.png',0,'1537896525'),(9,'pepe','argento','pepe@gmail.com','hola1','user.png',0,'2256355874'),(10,'Cristian','arguello','cris@gmail.com','$2a$10$AuDBarjU29o3wNCnR8yaJ.unewX1g9eDSYxfE5nfW4AeqPzzT2ZXa','default-image.png',0,NULL),(11,'Admin','Admin','admin@gmail.com','$2a$10$6MUWPZl4Ucf9PJnuOHjyL.Fkq/w47zScsrPPjx25B0/SuOaAjMj9q','default-image.png',0,NULL),(12,'cleo','garcia','cleooo@gmail.com','$2a$10$/C6uQd2xbNOhHmgzsy1KIe4HHSVCC17rOeIz9z7hAo88YfdvbcOS6','default-image.png',1,NULL),(13,'ricardo','juturi','ricardo@gmail.com','$2a$10$Xm4rhMvzc3GawK3TcfD00uS.nT99XZQmr2RF23EQtRtEzdOBx73Ca','default-image.png',1,NULL),(14,'ale','ale','ale@gmail.com','$2a$10$3HhVYyvuFoY2zl8HVP0tqe2UqZjYJDuxsozFmtdzHZssJ10q91KTu','default-image.png',1,'1155997722'),(15,'mimi ','garcia','mimi@gmail.com','$2a$10$uxCwnw3CtCIXf36rmjOu3.CP2d2xnnZOlkVwiEgpCki7AOmlKV3By','default-image.png',0,''),(16,'homero','simpson','homero@gmail.com','$2a$10$9bKaetAtdo35YM.Hv9NMvuCW6tusmtB2sKDUBubTv4lBp54elLROK','default-image.png',0,''),(17,'homero','simpson','simpson@gmail.com','$2a$10$6r.O.d3O4iAYP1wtROwoVOU4GMCaGXOZXbKICzIl12B0DIUlYrRp.','default-image.png',0,''),(18,'charly','garcia','charly@gmail.com','$2a$10$x5SemZsbCi39uRGhnuQWkO8ZiZSfH8qac8vHOfLNLzCeHBvMAVuTS','default-image.png',0,'');
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

-- Dump completed on 2022-04-01 16:57:30
