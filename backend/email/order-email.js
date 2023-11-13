import fs from 'fs'
import Mailer from './mailer.js'
import config from '../config.js'

const hostname = `http://${config.hostname}:${config.port}`

function getHtml (order) {
  let html = fs.readFileSync('./email/order-template.html', {
    encoding: 'utf-8'
  })
  const htmlItem = fs.readFileSync('./email/order-item-template.html', {
    encoding: 'utf-8'
  })

  let orderItems = ''
  console.log(order)
  order.OrderItems.forEach((item) => {
    orderItems += htmlItem
      .replace('{%imgSrc%}', item.Product.image)
      .replace('{%imgAlt%}', item.productTitle)
      .replace('{%productLink%}', `http://${config.hostname}/products/${item.Product.slug}`)
      .replace('{%productName%}', item.productTitle)
      .replace('{%price%}', item.price)
      .replace('{%count%}', item.quantity)
      .replace('{%summary%}', `${(item.quantity * item.price).toFixed(2)}`)
  })

  html = html
    .replace('{%hostname%}', hostname)
    .replace('{%name%}', order.name)
    .replace('{%orderId%}', order.id)
    .replace('{%total%}', order.total)
    .replace('{%orderItems%}', orderItems)

  return html
}
function sendOrderEmail (order) {
  const mailer = new Mailer()
  const html = getHtml(order)

  return mailer.sendMail({
    to: order.email,
    subject: `Интернет-магазин AromaHome: заказ №${order.id}`,
    html
  })
}
export { getHtml, sendOrderEmail }
