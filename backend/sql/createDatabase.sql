-- удаление БД, если существует
DROP DATABASE IF EXISTS `shop_data`;

-- создание новой БД
CREATE DATABASE `shop_data`;

USE `shop_data`;

-- создание таблицы категорий
CREATE TABLE categories (
  `id` INT AUTO_INCREMENT,
  `title` VARCHAR(255) CHARSET utf8 UNIQUE NOT NULL,
  `slug` VARCHAR(255) UNIQUE NOT NULL,
  `image` VARCHAR(2048) DEFAULT NULL,
  PRIMARY KEY (id)
);

-- создание таблицы производителей
CREATE TABLE brands (
  `id` INT AUTO_INCREMENT,
  `title` VARCHAR(255) CHARSET utf8 UNIQUE NOT NULL,
  `slug` VARCHAR(255) UNIQUE NOT NULL,
  `image` VARCHAR(2048) DEFAULT NULL,
  PRIMARY KEY (id)
);

-- создание таблицы товаров
CREATE TABLE products (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `category_id` int NOT NULL,
  `brand_id` int NOT NULL,
  `title` varchar(255) CHARSET utf8 UNIQUE NOT NULL,
  `slug` varchar(290) CHARSET utf8 UNIQUE NOT NULL,
  `image` varchar(2048) DEFAULT NULL,
  `description` varchar(2048) CHARSET utf8 DEFAULT NULL,
  `price` decimal(10, 2) DEFAULT NULL,
  FOREIGN KEY (`category_id`) REFERENCES categories (`id`) ON DELETE RESTRICT,
  FOREIGN KEY (`brand_id`) REFERENCES brands (`id`) ON DELETE RESTRICT
);

-- создание функции для генерации SLUG
SET
  GLOBAL log_bin_trust_function_creators = 1;

CREATE FUNCTION NAME_SLUG(name VARCHAR(128)) RETURNS VARCHAR(128) RETURN LOWER(REPLACE(name, ' ', '-'));

CREATE TRIGGER tg_products_insert BEFORE
INSERT
  ON products FOR EACH ROW BEGIN DECLARE product_id INT DEFAULT 0;

SELECT
  AUTO_INCREMENT INTO product_id
FROM
  information_schema.tables
WHERE
  table_name = 'products'
  AND table_schema = DATABASE();

SET
  NEW.slug = CONCAT(NAME_SLUG(NEW.title), '-', product_id);

END;

-- создание таблицы обратной связи
CREATE TABLE feedback (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `subject` VARCHAR(500) CHARSET utf8 DEFAULT NULL,
  `message` VARCHAR(2000) NOT NULL,
  `name` VARCHAR(150) CHARSET utf8 NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `received_date` timestamp DEFAULT CURRENT_TIMESTAMP
);

-- создание таблицы с картинками
CREATE TABLE images (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` int NOT NULL,
  `path` varchar(2048) NOT NULL,
  FOREIGN KEY (`product_id`) REFERENCES products (`id`) ON DELETE RESTRICT
);

-- создание таблицы пользователей
CREATE TABLE users (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `access_key` VARCHAR(36) UNIQUE NOT NULL
);

-- создание триггера для генерации UID пользователя 
CREATE TRIGGER before_insert_users BEFORE
INSERT
  ON users FOR EACH ROW
SET
  new.access_key = REPLACE(uuid(), '-', '');

-- создание таблицы с корзинами
CREATE TABLE shoping_carts (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES users (`id`) ON DELETE CASCADE
);

-- создание таблицы с товарами в корзине
CREATE TABLE cart_items (
  `cart_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  FOREIGN KEY (`cart_id`) REFERENCES `shoping_carts` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  PRIMARY KEY (`cart_id`, `product_id`)
);

-- создание сводной таблицы для продуктов
CREATE
OR REPLACE VIEW `products_view` AS
SELECT
  products.id AS `id`,
  category_id,
  categories.title AS `category_name`,
  brand_id,
  brands.title AS `brand_title`,
  products.title AS `title`,
  products.description AS `description`,
  products.image AS `image`,
  products.price AS `price`
FROM
  products
  JOIN categories ON products.category_id = categories.id
  JOIN brands ON products.brand_id = brands.id;