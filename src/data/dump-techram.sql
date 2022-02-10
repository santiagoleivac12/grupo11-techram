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
INSERT INTO `addresses` VALUES (1,'Av. pajarito','Buenos Aires','Buenos Aires',126,1557,1),(2,'calle de por ahi','Capital Federal','Buenos Aires',16,157,2),(3,'av. el paraiso','Pilar','Buenos Aires',1689,1669,3),(4,'av. Cristiania','Rafael Castillo','Buenos Aires',741,1751,4),(5,'Los alamos','Godoy Cruz','Mendoza',598,9668,5),(6,'Las CaÃƒÂ±itas','Desamparados','San Juan',458,1699,6),(7,'9 de Julio','Capital Federal','Buenos Aires',487,4508,7),(8,'Eufrates','Rafael Castillo','Buenos Aires',9,1755,8);
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
  `specificationsId` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `subcategoryId` int(11) NOT NULL,
  `images` text DEFAULT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `specifications_FK` (`specificationsId`),
  KEY `subcategory_FK_1` (`subcategoryId`),
  CONSTRAINT `specifications_FK` FOREIGN KEY (`specificationsId`) REFERENCES `specifications` (`id`),
  CONSTRAINT `subcategory_FK_1` FOREIGN KEY (`subcategoryId`) REFERENCES `subcategories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Modulo de memoria SPECTRIX D60G DDR4 RGB',1,14000,10,1,NULL,50),(2,'Micro Procesador Amd Ryzen 5 5600g 4.4ghz Am4 16mb C/ Video',2,35000,5,2,NULL,10),(3,'Teclado Redragon k552w',3,555555,5,3,NULL,25),(4,'Motherboard Asus Tuf Gaming Z590-plus Wifi Socket 1200',4,31000,10,4,NULL,15),(5,'onikuma k20',5,4000,5,3,NULL,5),(6,'Monitor AOC 27\"',6,28900,10,3,NULL,8),(7,'Luces Led 10m',7,1500,NULL,7,NULL,20),(8,'Tableta digital Wacom INtuos Small',8,30000,5,5,NULL,3),(9,'Placa de video MSI GeForce RTX 3080 Ti 12GB',9,340000,10,6,NULL,6),(10,'Cpu Cooler Xigmatek Windpower 963 Intel 1200 Amd Am4',10,8000,5,8,NULL,17);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_images`
--

LOCK TABLES `products_images` WRITE;
/*!40000 ALTER TABLE `products_images` DISABLE KEYS */;
INSERT INTO `products_images` VALUES (1,'producto11.png',1),(2,'producto3.jpg',2),(3,'producto4.png',3),(4,'producto5(2).jpg',4),(5,'productoAuriculares.jpeg',5),(6,'producto8.jpg',6),(7,'producto9.jpg',7),(8,'producto10.jpg',8),(9,'producto1.png',9),(10,'producto12.png',10);
/*!40000 ALTER TABLE `products_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specifications`
--

DROP TABLE IF EXISTS `specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `general` varchar(800) DEFAULT NULL,
  `conectivity` varchar(360) DEFAULT NULL,
  `characteristics` varchar(360) DEFAULT NULL,
  `illumination` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specifications`
--

LOCK TABLES `specifications` WRITE;
/*!40000 ALTER TABLE `specifications` DISABLE KEYS */;
INSERT INTO `specifications` VALUES (1,'La memoria XPG SPECTRIX D60G DDR4 cuenta con un diseÃƒÂ±o de tira de luz RGB doble excepcional que le da la mayor ÃƒÂ¡rea superficial RGB de cualquier mÃƒÂ³dulo de memoria! AdemÃƒÂ¡s, cuenta con una amplia gama de frecuencias de 3000 a 4133 MHz y admite los perfiles IntelÃ‚Â® XMP 2.0 para facilitar el aumento de la velocidad del reloj','frecuencias de 3000 a 4133 MHz y admite los perfiles IntelÃ‚Â® XMP 2.0','CL 14: latencia ultrabaja,','RGB programable'),(2,'Sin lugar a dudas, los procesadores para computadoras de escritorio AMD Ryzen serie 5000 elevan el nivel de expectativa para jugadores y artistas por igual.','ZÃƒÂ³calos compatibles: AM4,Tipos de memoria RAM soportadas: DDR4,','Cantidad de nÃƒÂºcleos de CPU: 6,Frecuencia mÃƒÂ¡xima de reloj: 4.4 GHz','-'),(3,'DisfrutÃƒÂ¡ de tus partidas en otro nivel con Redragon, marca reconocida que se especializa en brindar la mejor experiencia de juego al pÃƒÂºblico gamer desde hace mÃƒÂ¡s de 20 aÃƒÂ±os. Sus teclados se adaptan a todo tipo de jugadores y esto los convierten en un fiel reflejo de la alta gama y calidad que la compaÃƒÂ±ÃƒÂ­a ofrece. DistinciÃƒÂ³n a todo color Su retroiluminaciÃƒÂ³n le da un toque diferente a tu equipo y resalta su composiciÃƒÂ³n cuando es utilizado en espacios poco iluminados. TecnologÃƒÂ­a antighosting Este dispositivo tiene teclas antighosting. Esta cualidad es indispensable si requerÃƒÂ­s de un uso intensivo del perifÃƒÂ©rico. Gracias a esto podrÃƒÂ¡s evitar fallas al tocar varias teclas al mismo tiempo','USB','ErgonÃƒÂ³mico, reisstente a salpicaduras, antigosthing, mecÃƒÂ¡nico.','RGB rojo'),(4,'Tarjeta madre para juegos AMD B550 (Ryzen AM4) ATX con PCIe 4.0, doble M.2, 10 fases de poder DrMOS, Intel Wi-Fi 6, 2.5 Gb Ethernet, HDMI, DisplayPort, SATA 6 Gbps, USB 3.2 Gen 2 Type-A y Type -C, puerto ThunderboltÃ¢â€žÂ¢ 3 y compatibilidad con iluminaciÃƒÂ³n Aura Sync RGB','Conectores EATX de 4 y 8 contactos','Para mas especificaciones consulte a su tecnico','-'),(5,'ExperimentÃƒÂ¡ la adrenalina de sumergirte en la escena de otra manera! Tener auriculares especÃƒÂ­ficos para jugar cambia completamente tu experiencia en cada partida. Con los Onikuma K20 no te perdÃƒÂ©s ningÃƒÂºn detalle y escuchÃƒÂ¡s el audio tal y como fue diseÃƒÂ±ado por los creadores. El formato perfecto para vos. Al ser headset vas a poder escuchar tu mÃƒÂºsica preferida, mantener llamadas telefÃƒÂ³nicas y jugar en lÃƒÂ­nea desde tu pc sin perderte ningÃƒÂºn detalle.','Conector jack 3.5mm','MicrÃƒÂ³fono, respuesta de frecuencia 20Hx-20kHz, Largo de cable 2.2m','rgb led'),(6,'Una experiencia visual de calidad Este monitor de 23.8 te va a resultar de gran comodidad para estudiar, trabajar o ver una pelÃƒÂ­cula en tus tiempos de ocio. Asimismo, su resoluciÃƒÂ³n de 1920 x 1080 te permite disfrutar de momentos ÃƒÂºnicos gracias a una imagen con gran nitidez.','HDMI','27\",  pantalla curva, reclinable, resoluciÃƒÂ³n HD','-'),(7,'Tira de LED RGB 5050 de 5mts con controlador y control','220V','Marca TBCin,Modelo ES-WW10,Tipo de LED 220,Voltaje 220V,Largo 10m','LED'),(8,'Enciende tu imaginaciÃƒÂ³n con la nueva Intuos Draw. Incluye la tecnologÃƒÂ­a de pen tablet lÃƒÂ­der de Wacom, software creativo descargable gratuito y cursos de formaciÃƒÂ³n en lÃƒÂ­nea. Independientemente de que tu sueÃƒÂ±o sea crear bocetos asombrosos, compartir tu trabajo con amigos o comenzar una carpeta de trabajos, Intuos Draw tiene todo lo que necesitas para comenzar a crear inmediatamente.','USB','Largo del ÃƒÂ¡rea de trabajo: 95 mm, Incluye lÃƒÂ¡piz: SÃƒÂ­, Es multi-touch: No, Ancho del ÃƒÂ¡rea de trabajo: 152 mm','-'),(9,'VENTUS ofrece un diseÃƒÂ±o centrado en el rendimiento que mantiene lo esencial para realizar cualquier tarea. Una disposiciÃƒÂ³n de triple ventilador capaz colocada en un diseÃƒÂ±o industrial rÃƒÂ­gido permite que esta tarjeta grÃƒÂ¡fica de aspecto elegante se adapte a cualquier construcciÃƒÂ³n.','DisplayPort(v1.4a)','Fabricante: Nvidia, Tipo de memoria grÃƒÂ¡fica: GDDR6X, Interfaz con la placa madre: PCI-Express 4.0, TamaÃƒÂ±o de memoria: 8 GB, Contectividad: DisplayPort x 3 (v1.4a) HDMI x 1 (Supports 4K@120Hz as specified in HDMI 2.1)','-'),(10,'Consumo 3, TDP120W, Tipo de refrigeracionAire, Velocidad del Fan 800-1800 RPM, MTTF 35K Horas','amd am4','Marca Xigmatek,LÃƒÂ­nea Windpower,Modelo WP964 RGB','RGB');
/*!40000 ALTER TABLE `specifications` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Santiago','Leiva','santyleiva53@gmail.com','Hola1234','user.png',0,'11502365896'),(2,'Brian','Garcia','garciabrianalejandro@gmail.com','hola1234','user.png',1,'1155665896'),(3,'Ricardo','Juturi','ricardojuturi53@gmail.com','hola12345','user.png',1,'112369874'),(4,'Micaela','Sosa','micaesosa556@gmail.com','hola4321','user.png',1,'2612531016'),(5,'Mara','Leiva','maleiva53@gmail.com','hola43211','user.png',0,'2263598455'),(6,'Celeste','Otazo','celesteotazo53@gmail.com','hola54321','user.png',0,'1536985235'),(7,'Lautaro','Bozzolo','lautarobozzolo53@gmail.com','hola1234567','user.png',0,'1537896525'),(8,'Hola','Decime','queanda@gmail.com','hola1234567','user.png',0,'1537896525'),(9,'pepe','argento','pepe@gmail.com','hola1','user.png',0,'2256355874'),(10,'Cristian','arguello','cris@gmail.com','$2a$10$AuDBarjU29o3wNCnR8yaJ.unewX1g9eDSYxfE5nfW4AeqPzzT2ZXa','default-image.png',0,NULL),(11,'Admin','Admin','admin@gmail.com','$2a$10$6MUWPZl4Ucf9PJnuOHjyL.Fkq/w47zScsrPPjx25B0/SuOaAjMj9q','default-image.png',0,NULL),(12,'cleo','garcia','cleooo@gmail.com','$2a$10$/C6uQd2xbNOhHmgzsy1KIe4HHSVCC17rOeIz9z7hAo88YfdvbcOS6','default-image.png',1,NULL),(13,'ricardo','juturi','ricardo@gmail.com','$2a$10$Xm4rhMvzc3GawK3TcfD00uS.nT99XZQmr2RF23EQtRtEzdOBx73Ca','default-image.png',1,NULL);
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

-- Dump completed on 2022-02-06 20:34:36