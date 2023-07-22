DROP DATABASE IF EXISTS `shop_data`;

CREATE DATABASE `shop_data`;

USE `shop_data`;

CREATE TABLE shop_data.categories (
  `id` INT AUTO_INCREMENT,
  `title` VARCHAR(255) CHARSET utf8 UNIQUE NOT NULL,
  `slug` VARCHAR(255) UNIQUE NOT NULL,
  `image` VARCHAR(2048) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE shop_data.brands (
  `id` INT AUTO_INCREMENT,
  `title` VARCHAR(255) CHARSET utf8 UNIQUE NOT NULL,
  `slug` VARCHAR(255) UNIQUE NOT NULL,
  `image` VARCHAR(2048) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE shop_data.products (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `category_id` int NOT NULL,
  `brand_id` int NOT NULL,
  `title` varchar(255) CHARSET utf8 UNIQUE NOT NULL,
  `image` varchar(2048) DEFAULT NULL,
  `description` varchar(2048) CHARSET utf8 DEFAULT NULL,
  `price` decimal(10, 2) DEFAULT NULL,
  FOREIGN KEY (`category_id`) REFERENCES categories (`id`) ON DELETE RESTRICT,
  FOREIGN KEY (`brand_id`) REFERENCES brands (`id`) ON DELETE RESTRICT
);

CREATE TABLE shop_data.feedback (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `subject` VARCHAR(500) CHARSET utf8 DEFAULT NULL,
  `message` VARCHAR(2000) NOT NULL,
  `name` VARCHAR(150) CHARSET utf8,
  `phone` VARCHAR(20),
  `email` VARCHAR(150),
  `received_date` timestamp DEFAULT CURRENT_TIMESTAMP
);

-- создание виртуальной таблицы
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

-- вставка категорий
INSERT INTO
  shop_data.categories(`id`, `title`, `slug`)
VALUES
  ('1', 'для дома', 'dlia_doma');

INSERT INTO
  shop_data.categories(`id`, `title`, `slug`)
VALUES
  ('2', 'для авто', 'dlia_avto');

INSERT INTO
  shop_data.categories(`id`, `title`, `slug`)
VALUES
  ('3', 'услуги космологии', 'uslugi_kosmetologii');

-- вставка производителей
INSERT INTO
  shop_data.brands(`id`, `title`, `slug`)
VALUES
  ('1', 'VINOVE', 'vinove');

INSERT INTO
  shop_data.brands(`id`, `title`, `slug`)
VALUES
  ('2', 'MR&MRS FRAGRANCE', 'mrandmrs_fragrance');

-- вставка продуктов
INSERT INTO
  shop_data.products(
    `category_id`,
    `brand_id`,
    `title`,
    `description`,
    `image`,
    `price`
  )
VALUES
  (
    '2',
    '1',
    'Imola (V05-08)',
    'Ароматизатор VINOVE Imola (V05-08) - излучает сияние, свежесть и женскую энергию. Пробуждает силу зеленого чая и завораживает букетом гиацинтов.
Верхние ноты : лимон, алоэ.\nНоты сердца: зеленый чай, жасмин, гиацинт.\nБазовая нота : мускус, ветивер, пачули.',
    'img/imola.jpg',
    '508.00'
  );

INSERT INTO
  shop_data.products(
    `category_id`,
    `brand_id`,
    `title`,
    `description`,
    `image`,
    `price`
  )
VALUES
  (
    '2',
    '1',
    'Bahrain (V01-06)',
    'Ароматизатор VINOVE Bahrain (V01-06) - запах кипящий молодостью, щедростью и радостью жизни.\nВерхняя нота: мандарин, апельсин, грейпфрут, цветок апельсина и зеленый чай.\nНотa сердца: пион, магнолия, ландыш, базилик, маракуйа и дыня.\nБазовая нота: сандаловое дерево, амбра и мускус.',
    'img/bahrain.jpg',
    '1047.00'
  );

INSERT INTO
  shop_data.products(
    `category_id`,
    `brand_id`,
    `title`,
    `description`,
    `image`,
    `price`
  )
VALUES
  (
    '2',
    '1',
    'Fuji (V01-04)',
    'Ароматизатор VINOVE Fuji (V01-04) - успокаивает чувства перенося в состояние покоя и гармонии. Этот запах расслабляет. Вносит равновесие в каждый новый день.\nСочетает выразительность целебных трав, грейпфрута с силой специй и смолистым деревом. Заостряет внимание на том, что на самом деле важно.\nВерхняя нота: черный перец, элеми, грейпфрут.\nНота сердца: лаванда, герань.\nБазовая нота: пачули, ветивер, aмбра, сухой лес.',
    'img/fuji.jpg',
    '1100.00'
  );

INSERT INTO
  shop_data.products(
    `category_id`,
    `brand_id`,
    `title`,
    `description`,
    `image`,
    `price`
  )
VALUES
  (
    '2',
    '1',
    'Indianapolis (V01-03)',
    'Ароматизатор VINOVE Indianapolis (V01-03) - неотразимо привлекательный, добавляет престижа и делает ключевые решения более приятными.\nВерхние ноты: бергамот, кардамон.\nНоты сердца : Ирис, Лаванда.\nБазовая нота : кедр, амбра, мускус.',
    'img/indianapolis.jpg',
    '1100.00'
  );

INSERT INTO
  shop_data.products(
    `category_id`,
    `brand_id`,
    `title`,
    `description`,
    `image`,
    `price`
  )
VALUES
  (
    '2',
    '1',
    'Maranello (V01-16)',
    'Ароматизатор воздуха VINOVE Maranello (V01-16) содержится в полностью безопасном для интерьера автомобиле, прочном полимере, который вместе с корпусом содержит ароматический конденсатор. Испытания показали полную устойчивость этих духов к высоким и низким температурам. Ни один из компонентов, используемых в парфюмах. VINOVE, не вреден для материалов, используемых в интерьерах автомобилей. Конденсатор аромата VINOVE имеет твердую форму, так что из него не вытекает вещество — только исключительный запах.',
    'img/maranello.jpg',
    '1060.00'
  );

INSERT INTO
  shop_data.products(
    `category_id`,
    `brand_id`,
    `title`,
    `description`,
    `image`,
    `price`
  )
VALUES
  (
    '2',
    '1',
    'Monaco (V01-05)',
    'Ароматизатор VINOVE Monaco (V01-05) - запах беззаботных каникул, семейных радостей и вкуса жизни.\nВерхняя нота: лимон, грейпфрут, розмарин.\nНотa сердца: имбирь, элеми, лаванда.\nБазовая нота: кедровое и сандаловое дерево, ветивер.',
    'img/monaco.jpg',
    '1060.00'
  );

INSERT INTO
  shop_data.products(
    `category_id`,
    `brand_id`,
    `title`,
    `description`,
    `image`,
    `price`
  )
VALUES
  (
    '2',
    '1',
    'Monza (V01-07)',
    'Ароматизатор VINOVE Monza (V01-07) - это электролизующий запах. Аромат для остроумных, креативных и решительных женщин. Аромат сладкого обещания и чувственной притягательности. Monza это сочетание противоречий, свежести ананаса и персика с пышным букетом амарантовых роз, а также сладостью шоколада и карамеля.\nВерхняя нота: нероли, бергамот, ананас, персик.\nНота сердца: фиалка, жасмин, роза.\nБазовая нота: шоколад, карамель, пачули.',
    'img/monza.jpg',
    '1060.00'
  );

INSERT INTO
  shop_data.products(
    `category_id`,
    `brand_id`,
    `title`,
    `description`,
    `image`,
    `price`
  )
VALUES
  (
    '2',
    '1',
    'Sebring (V01-02)',
    'Ароматизатор VINOVE Sebring (V01-02) - сочетает освежающую бодрость цитрусов и сочной дыни в водопаде кристально чистой воды, усиленной холодом мяты.\nВерхняя нота: цитрусы, озоновые ноты, гуава, папайа и дыня.\nНота сердца: цветок апаельсина, жасмин, магнолия, мята.\nБазовая нота: сандаловое и кедровое дерево, мох, мускус, амбра.',
    'img/sebring.jpg',
    '1080.00'
  );

INSERT INTO
  shop_data.products(
    `category_id`,
    `brand_id`,
    `title`,
    `description`,
    `image`,
    `price`
  )
VALUES
  (
    '2',
    '1',
    'Silverstone (V01-01)',
    'Ароматизатор VINOVE Silverstone (V01-01) - это запах победителей. В начале поражает свежестью лимона, целебных трав и лавандой. Набирает скорость благородными нотами дерева с апельсином. На финише оставляет запах мускуса и силу пачули.\nВерхняя нота: лимон, целебные травы, лаванда.\nНота сердца: древесные ноты кедра, цветок апельсина.\nБазовая нота: мускус и пудровые ноты с акцентом пачули.',
    'img/silverstone.jpg',
    '1080.00'
  );

INSERT INTO
  shop_data.products(
    `category_id`,
    `brand_id`,
    `title`,
    `description`,
    `image`,
    `price`
  )
VALUES
  (
    '2',
    '1',
    'Yas marina (V01-09)',
    'Ароматизатор VINOVE Yas marina (V01-09) - как букет свежих цветов в сердце пустыни. Удивительный аромат белых роз, ландыша и фиалки.\nВерхняя нота: груша, персик, ландыш.\nНотa сердца: пион, роза, фиалка.\nБазовая нота: мускус, кедровое дерево.',
    'img/yas-marina.jpg',
    '1080.00'
  );