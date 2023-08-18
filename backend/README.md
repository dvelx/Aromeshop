# Aromashop ServerAPI

* [x] Авторизация
* [x] Работа с товарами
* [x] Работа с корзиной
* [ ] Оформление заказа

## Авторизация
#### GET /api/users/accessKey
Возвращаемое значение:
```json
{
  // идентификатор пользователя
  "id": 8, 
  // уникальный ключ
  "accessKey": "40fd17e03e1211eeb8f040b0760f8b84"
}
```
## Категории товаров
#### GET /api/categories
Возвращаемое значение - массив объектов:
```json
[
  {
    "id": 1, // идентификатор
    "title": "для дома", // название категории
    "slug": "dlia_doma", // url
    "image": null // ссылка на логотип
  }
]
```
## Товары
#### POST /api/category
#### GET /api/brands
#### GET /api/products
#### GET /api/product
#### POST /api/product

## Корзина
#### GET /api/baskets
#### POST /api/baskets
#### PUT /api/baskets
#### DELETE /api/baskets
