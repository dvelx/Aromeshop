USE `shop_data`;

-- вставка категорий

INSERT INTO
    categories(`id`, `title`, `slug`)
VALUES ('1', 'для дома', 'dlia_doma');

INSERT INTO
    categories(`id`, `title`, `slug`)
VALUES ('2', 'для авто', 'dlia_avto');

INSERT INTO
    categories(`id`, `title`, `slug`)
VALUES (
        '3',
        'услуги космологии',
        'uslugi_kosmetologii'
    );

INSERT INTO
    categories(`id`, `title`, `slug`)
VALUES (
        '4',
        'ароматические свечи',
        'aromaticheskie_svechi'
    );

-- вставка производителей

INSERT INTO
    brands(`id`, `title`, `slug`)
VALUES ('1', 'VINOVE', 'vinove');

INSERT INTO
    brands(`id`, `title`, `slug`)
VALUES (
        '2',
        'MR&MRS FRAGRANCE',
        'mrandmrs_fragrance'
    );

-- вставка продуктов

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '1',
        'Imola (V05-08)',
        'Ароматизатор VINOVE Imola (V05-08) - излучает сияние, свежесть и женскую энергию. Пробуждает силу зеленого чая и завораживает букетом гиацинтов.
Верхние ноты : лимон, алоэ.\nНоты сердца: зеленый чай, жасмин, гиацинт.\nБазовая нота : мускус, ветивер, пачули.',
        'img/imola.jpg',
        '508.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '1',
        'Bahrain (V01-06)',
        'Ароматизатор VINOVE Bahrain (V01-06) - запах кипящий молодостью, щедростью и радостью жизни.\nВерхняя нота: мандарин, апельсин, грейпфрут, цветок апельсина и зеленый чай.\nНотa сердца: пион, магнолия, ландыш, базилик, маракуйа и дыня.\nБазовая нота: сандаловое дерево, амбра и мускус.',
        'img/bahrain.jpg',
        '1047.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '1',
        'Fuji (V01-04)',
        'Ароматизатор VINOVE Fuji (V01-04) - успокаивает чувства перенося в состояние покоя и гармонии. Этот запах расслабляет. Вносит равновесие в каждый новый день.\nСочетает выразительность целебных трав, грейпфрута с силой специй и смолистым деревом. Заостряет внимание на том, что на самом деле важно.\nВерхняя нота: черный перец, элеми, грейпфрут.\nНота сердца: лаванда, герань.\nБазовая нота: пачули, ветивер, aмбра, сухой лес.',
        'img/fuji.jpg',
        '1100.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '1',
        'Indianapolis (V01-03)',
        'Ароматизатор VINOVE Indianapolis (V01-03) - неотразимо привлекательный, добавляет престижа и делает ключевые решения более приятными.\nВерхние ноты: бергамот, кардамон.\nНоты сердца : Ирис, Лаванда.\nБазовая нота : кедр, амбра, мускус.',
        'img/indianapolis.jpg',
        '1100.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '1',
        'Maranello (V01-16)',
        'Ароматизатор воздуха VINOVE Maranello (V01-16) содержится в полностью безопасном для интерьера автомобиле, прочном полимере, который вместе с корпусом содержит ароматический конденсатор. Испытания показали полную устойчивость этих духов к высоким и низким температурам. Ни один из компонентов, используемых в парфюмах. VINOVE, не вреден для материалов, используемых в интерьерах автомобилей. Конденсатор аромата VINOVE имеет твердую форму, так что из него не вытекает вещество — только исключительный запах.',
        'img/maranello.jpg',
        '1060.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '1',
        'Monaco (V01-05)',
        'Ароматизатор VINOVE Monaco (V01-05) - запах беззаботных каникул, семейных радостей и вкуса жизни.\nВерхняя нота: лимон, грейпфрут, розмарин.\nНотa сердца: имбирь, элеми, лаванда.\nБазовая нота: кедровое и сандаловое дерево, ветивер.',
        'img/monaco.jpg',
        '1060.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '1',
        'Monza (V01-07)',
        'Ароматизатор VINOVE Monza (V01-07) - это электролизующий запах. Аромат для остроумных, креативных и решительных женщин. Аромат сладкого обещания и чувственной притягательности. Monza это сочетание противоречий, свежести ананаса и персика с пышным букетом амарантовых роз, а также сладостью шоколада и карамеля.\nВерхняя нота: нероли, бергамот, ананас, персик.\nНота сердца: фиалка, жасмин, роза.\nБазовая нота: шоколад, карамель, пачули.',
        'img/monza.jpg',
        '1060.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '1',
        'Sebring (V01-02)',
        'Ароматизатор VINOVE Sebring (V01-02) - сочетает освежающую бодрость цитрусов и сочной дыни в водопаде кристально чистой воды, усиленной холодом мяты.\nВерхняя нота: цитрусы, озоновые ноты, гуава, папайа и дыня.\nНота сердца: цветок апаельсина, жасмин, магнолия, мята.\nБазовая нота: сандаловое и кедровое дерево, мох, мускус, амбра.',
        'img/sebring.jpg',
        '1080.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '1',
        'Silverstone (V01-01)',
        'Ароматизатор VINOVE Silverstone (V01-01) - это запах победителей. В начале поражает свежестью лимона, целебных трав и лавандой. Набирает скорость благородными нотами дерева с апельсином. На финише оставляет запах мускуса и силу пачули.\nВерхняя нота: лимон, целебные травы, лаванда.\nНота сердца: древесные ноты кедра, цветок апельсина.\nБазовая нота: мускус и пудровые ноты с акцентом пачули.',
        'img/silverstone.jpg',
        '1080.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '1',
        'Yas marina (V01-09)',
        'Ароматизатор VINOVE Yas marina (V01-09) - как букет свежих цветов в сердце пустыни. Удивительный аромат белых роз, ландыша и фиалки.\nВерхняя нота: груша, персик, ландыш.\nНотa сердца: пион, роза, фиалка.\nБазовая нота: мускус, кедровое дерево.',
        'img/yas-marina.jpg',
        '1080.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '1',
        '2',
        'Аромадиффузор QUEEN №1 500 мл',
        'Аромат №1: МАНДАРИН-ЖАСМИН-МУСКУС\nРоскошный парфюмерный артефакт для вашего интерьера. Изысканный дизайн и искрящийся цитрусовой свежестью аромат с солнечным настроением.',
        'img/imgonline-com-ua-Resize-3ovtWuLDXTo9VFS8.png',
        '7500.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '1',
        '2',
        'Аромадиффузор QUEEN №2 500 мл',
        'Аромат №2: ФЛЕРДОРАНЖ-РОЗА-САНДАЛ\nРоскошный парфюмерный артефакт для вашего интерьера. Изысканный дизайн и чувственный аромат, объединяющий мягкую сладость цветочных аккордов и благородное древесное тепло.',
        'img/imgonline-com-ua-Resize-o4LcMkDa2PQe.png',
        '7500.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '1',
        '2',
        'Аромадиффузор QUEEN №3 500 мл',
        'Аромат №3: ЧАЙ МАТЧА - БЛАГОВОНИЯ - ПАЧУЛИ\nРоскошный парфюмерный артефакт для вашего интерьера. Изысканный дизайн и утонченный медитативный аромат чая, пачули и благовоний.',
        'img/imgonline-com-ua-Resize-3ovtWuLDXTo9VFS8.png',
        '7500.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '1',
        '2',
        'Аромадиффузор QUEEN №4 500 мл',
        'Аромат №4: ПАЛО САНТО - ЛАБДАНУМ - КЕДР\nРоскошный парфюмерный артефакт для вашего интерьера. Изысканный дизайн и утонченная парфюмерная композиция с богатой палитрой древесных аккордов от свежих воздушных до пряных, смолистых и дымных',
        'img/imgonline-com-ua-Resize-LdFFBOtM6NWDMKy.png',
        '7500.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '1',
        '2',
        'Аромадиффузор QUEEN №5 500 мл',
        'Аромат №5: БЕРГАМОТ - ЛИСТЬЯ ИНЖИРА - БОБЫ ТОНКА\nРоскошный парфюмерный артефакт для вашего интерьера. Изысканный дизайн и невероятно жизнерадостный и позитивный цитрусово-гурманский аромат',
        'img/imgonline-com-ua-Resize-HzuutgmTzOer8.png',
        '7500.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '1',
        '2',
        'Аромадиффузор QUEEN №6 500 мл',
        'Аромат №6: ЦИТРУСОВЫЕ ЦУКАТЫ-УД-ЧЕРНАЯ АМБРА\nРоскошный парфюмерный артефакт для вашего интерьера. Изысканный дизайн и роскошный ориентальный аромат, создающий в пространстве атмосферу не праздника, но торжества',
        'img/imgonline-com-ua-Resize-dvS244LZnVk.png',
        '7500.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '2',
        'NIKI PEPPER MINT',
        'Дизайнерский ароматизатор для автомобиля NIKI PEPPER MINT | ПЕРЕЧНАЯ МЯТА красный металлик',
        'img/imgonline-com-ua-Resize-aiBVrqAV6fEe.png',
        '1890.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '2',
        'NIKI FRESH AIR',
        'Парфюмированный аксессуар для авто с уникальным дизайном от маэстро итальянского стиля Лука Трацци и роскошным ароматом от парфюмеров легендарного французского концерна MANE.',
        'img/imgonline-com-ua-Resize-DsnX6fgqmODpie.png',
        '1890.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '2',
        'NIKI EQUILIBRIUM',
        'Парфюмированный аксессуар для авто с уникальным дизайном от маэстро итальянского стиля Лука Трацци и роскошным ароматом от парфюмеров легендарного французского концерна MANE.',
        'img/imgonline-com-ua-Resize-kJ7PbMQnFiqp.png',
        '1890.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '2',
        'NIKI BLACK ORCHID',
        'Парфюмированный аксессуар для авто с уникальным дизайном от маэстро итальянского стиля Лука Трацци и роскошным ароматом от парфюмеров легендарного французского концерна MANE.',
        'img/imgonline-com-ua-Resize-W3tb2R0BGG4hTXu.png',
        '1890.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '2',
        'NIKI BERRIES',
        'Парфюмированный аксессуар для авто с уникальным дизайном от маэстро итальянского стиля Лука Трацци и роскошным ароматом от парфюмеров легендарного французского концерна MANE.',
        'img/imgonline-com-ua-Resize-HoJxR2m5cdK.png',
        '1890.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '2',
        'NIKI CITRUS & MUSK',
        'Парфюмированный аксессуар для авто с уникальным дизайном от маэстро итальянского стиля Лука Трацци и роскошным ароматом от парфюмеров легендарного французского концерна MANE.',
        'img/imgonline-com-ua-Resize-IzGxiGGNNhUGwm.png',
        '1890.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '2',
        'NIKI SPICY CITRUS',
        'Парфюмированный аксессуар для авто с уникальным дизайном от маэстро итальянского стиля Лука Трацци и роскошным ароматом от парфюмеров легендарного французского концерна MANE.',
        'img/imgonline-com-ua-Resize-yo5O9i9qgWuV8UH.png',
        '1890.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '2',
        'NIKI PEACH & ROSE',
        'Парфюмированный аксессуар для авто с уникальным дизайном от маэстро итальянского стиля Лука Трацци и роскошным ароматом от парфюмеров легендарного французского концерна MANE.',
        'img/imgonline-com-ua-Resize-8hyfJTKToz.png',
        '1890.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '2',
        'NIKI RED FRUITS',
        'Парфюмированный аксессуар для авто с уникальным дизайном от маэстро итальянского стиля Лука Трацци и роскошным ароматом от парфюмеров легендарного французского концерна MANE.',
        'img/imgonline-com-ua-Resize-pRW31vB8cHcL.png',
        '1890.00'
    );

INSERT INTO
    products(
        `category_id`,
        `brand_id`,
        `title`,
        `description`,
        `image`,
        `price`
    )
VALUES (
        '2',
        '2',
        'NIKI CHERRY BLOSSOM',
        'Парфюмированный аксессуар для авто с уникальным дизайном от маэстро итальянского стиля Лука Трацци и роскошным ароматом от парфюмеров легендарного французского концерна MANE.',
        'img/imgonline-com-ua-Resize-EAAhnM4b7jr5c0lg.png',
        '1890.00'
    );

INSERT INTO
    order_statuses(`title`, `code`)
VALUES
('Оформлен', 'pending');

INSERT INTO
    order_statuses(`title`, `code`)
VALUES
(
        'Ожидает оплаты',
        'awaiting payment'
    );

INSERT INTO
    order_statuses(`title`, `code`)
VALUES
(
        'Принято в работу',
        'awaiting fulfillment'
    );

INSERT INTO
    order_statuses(`title`, `code`)
VALUES
(
        'Ожидает отправки',
        'awaiting shipment'
    );

INSERT INTO
    order_statuses(`title`, `code`)
VALUES
(
        'Готов к выдаче',
        'awaiting pickup'
    );

INSERT INTO
    order_statuses(`title`, `code`)
VALUES
(
        'Частично доставлен',
        'partially shipped'
    );

INSERT INTO
    order_statuses(`title`, `code`)
VALUES
('Получен', 'completed');

INSERT INTO
    order_statuses(`title`, `code`)
VALUES
('Доставляется', 'shipped');

INSERT INTO
    order_statuses(`title`, `code`)
VALUES
('Отменён', 'cancelled');

INSERT INTO
    order_statuses(`title`, `code`)
VALUES
('Возвращён', 'refunded');

INSERT INTO
    order_statuses(`title`, `code`)
VALUES
(
        'Частично возвращён',
        'partially refunded'
    );