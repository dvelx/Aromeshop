import Brand from "./Brand.js";
import Cart from "./Cart.js";
import CartItem from "./CartItem.js";
import Category from "./Category.js";
import Feedback from "./Feedback.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import OrderStatus from "./OrderStatus.js";
import Product from "./Product.js";
import User from "./User.js";

Brand.hasMany(Product, { foreignKey: "brand_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });
User.hasOne(Cart, { foreignKey: "user_id" });
Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });
Category.hasMany(Product, { foreignKey: "category_id" });
CartItem.belongsTo(Product, { foreignKey: "product_id" });
Product.belongsTo(Brand, { foreignKey: "brand_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });
Order.belongsTo(OrderStatus, { foreignKey: "status_id" });
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" })
OrderStatus.hasMany(Order, { foreignKey: "status_id" });

export {
  Brand,
  Cart,
  CartItem,
  Category,
  Feedback,
  Order,
  OrderItem,
  OrderStatus,
  Product,
  User,
};
