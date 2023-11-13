import { Op } from 'sequelize'
import { Brand, Cart, CartItem, Category, Order, OrderItem, OrderStatus, Product, User } from '../models/index.js'

class databaseController {
  /** Получает список категорий с БД */
  async getCategories () {
    return await Category.findAll()
  }

  /** Получает список производителей с БД */
  async getBrands () {
    return await Brand.findAll({
      attributes: {
        include: [
          [
            Brand.sequelize.fn('COUNT', Brand.sequelize.col('Products.id')),
            'productsCount'
          ]
        ]
      },
      include: [{ model: Product, attributes: [] }],
      group: ['Brand.id']
    })
  }

  async addCategory ({ title, image }) {
    return await Category.create({ title, image })
  }

  async addProduct ({ title, image, description, price }) {
    return await Product.create({ title, image, description, price })
  }

  async addUser () {
    let user
    try {
      user = await User.create()
      await user.reload()
    } catch (error) {
      console.log(error)
    }
    return user
  }

  async getUserByUID (uid) {
    return await User.findOne({ where: { accessKey: uid } })
  }

  async getProducts (
    { limit, page, sortBy, order, priceFrom, priceTo }
  ) {
    //     const sortValue = { id: "id", price: "price", name: "title" };
    //     const orderValue = { asc: "ASC", desc: "DESC" };

    //     let sorting = sortValue[sortBy] ? sortValue[sortBy] : sortValue.id;
    //     let ordering = orderValue[order] ? orderValue[order] : orderValue.asc;
    //     let sql = `SELECT *, CONCAT('${hostname}', image) as image_url FROM ${this.db_name}.products_view`;

    //     const where = ` WHERE ${priceFrom ? "price > " + priceFrom : ""} ${
    //       priceFrom && priceTo ? " AND" : ""
    //     } ${priceTo ? "price < " + priceTo : ""}`;

    //     if (priceFrom || priceTo) sql += where;
    //     sql += ` ORDER BY ${
    //       sortBy === "name" ? " brand_title " + ordering + ", " : ""
    //     }${sorting} ${ordering} `;

    //     if (page && limit && page > 0) {
    //       sql += ` LIMIT ${(page - 1) * limit}, ${limit}`;
    //     } else if (limit) sql += ` LIMIT ${limit}`;

    //     const products = await this.runQuery(sql);
    //     sql = `SELECT COUNT(*) AS count, MIN(price) AS minPrice, MAX(price) AS maxPrice FROM ${this.db_name}.products_view`;
    //     if (priceFrom || priceTo) sql += where;
    //     const [{ count, minPrice, maxPrice }] = await this.runQuery(sql);
    //     return {
    //       products,
    //       pagination: { page: +page, limit: +limit, count },
    //       filter: { minPrice, maxPrice },
    //     };
    return await Product.findAll({
      attributes: {
        exclude: ['brand_id', 'category_id']
      },
      include: [Brand, Category]
    })
  }

  async getProductById (productId) {
    return await Product.findOne({
      where: {
        [Op.or]: [{ id: productId }, { slug: productId }]
      },
      attributes: { exclude: ['brand_id', 'category_id'] },
      include: [Brand, Category]
    })
  }

  async getCart (accessKey) {
    let user
    // accessKey не передан - создать нового пользователя
    if (!accessKey) {
      user = await this.addUser()
    } else {
      // получаем пользователя по UID
      user = await User.findOne({ where: { accessKey } })
      // если пользователь не найден вернём ошибку
      if (!user) return null
    }

    const count = await Cart.count({ where: { userId: user.id } })

    if (count === 0) {
      await Cart.create({ userId: user.id })
    }
    // получаем корзину по UID пользователя
    return await Cart.findOne({
      attributes: ['id'],
      where: { userId: user.id },
      include: [
        {
          model: CartItem,
          include: {
            model: Product,
            attributes: [
              'id',
              'slug',
              'title',
              'description',
              'price',
              'image'
            ],
            include: [Brand, Category]
          },
          attributes: ['quantity']
        },
        User
      ]
    })
  }

  async addProductToCart ({ cartId, productId, quantity }) {
    let cartItem = await CartItem.findOne({ where: { cartId, productId } })

    if (cartItem) {
      cartItem.increment('quantity', { by: quantity })
    } else {
      cartItem = await CartItem.create({ cartId, productId, quantity })
    }
    return cartItem
  }

  async setProductQuantity ({ cartId, productId, quantity }) {
    return await CartItem.update(
      { quantity },
      { where: { cartId, productId } }
    )
  }

  async deleteProductFromCart ({ cartId, productId }) {
    return await CartItem.destroy({ where: { cartId, productId } })
  }

  /* async addOrderItem({ orderId, productId, productTitle, quantity, price }) {
    return await OrderItem.create({
      orderId,
      productId,
      productTitle,
      quantity,
      price,
    });
  } */
  async makeOrder ({ name, address, phone, email, comment }, cart) {
    const t = await Order.sequelize.transaction()

    try {
      const order = await Order.create(
        {
          name,
          address,
          phone,
          email,
          comment
        },
        { transaction: t }
      )

      for (const item of cart.CartItems) {
        const product = item.Product

        await OrderItem.create({
          orderId: order.id,
          productId: product.id,
          productTitle: product.title,
          quantity: item.quantity,
          price: product.price
        },
        {
          transaction: t
        })
      }
      await cart.destroy()
      await t.commit()
      return order.id
    } catch (error) {
      console.log(error)
      await t.rollback()
    }
  }

  async getOrderById (orderId) {
    return await Order.findByPk(orderId, {
      attributes: {
        include: [[Order.sequelize.literal('(SELECT SUM(quantity * price) FROM order_items WHERE order_items.order_id = Order.id)'), 'total']],
        exclude: ['status_id', 'statusId']
      },
      include: [
        {
          model: OrderItem,
          attributes: ['quantity', 'price', 'productTitle'],

          include: {
            model: Product,
            attributes: [
              'id',
              'slug',
              'title',
              'description',
              'price',
              'image'
            ],
            include: [Brand, Category]
          }
        },
        OrderStatus
      ]
    })
  }
}

export default new databaseController()
