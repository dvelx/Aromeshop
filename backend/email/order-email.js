import fs from 'fs'
import Mailer from './mailer.js'

function getHtml (order, hostname) {
  let html = fs.readFileSync('./email/order-template.html', {
    encoding: 'utf-8'
  })
  const htmlItem = fs.readFileSync('./email/order-item-template.html', {
    encoding: 'utf-8'
  })

  let orderItems = ''
  order.items.forEach((item) => {
    console.log('getHtml: ', item.product)
    orderItems += htmlItem
      .replace('{%imgSrc%}', item.product.image_url)
      .replace('{%imgAlt%}', item.product_title)
      .replace('{%productLink%}', `${hostname}api/product/${item.product.slug}`)
      .replace('{%productName%}', item.product_title)
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
function sendOrderEmail ({ order, hostname }) {
  const mailer = new Mailer()
  const html = getHtml(order, hostname)
  console.log(html)
  return mailer.sendMail({
    to: order.email,
    subject: `Интернет-магазин AromaHome: заказ №${order.id}`,
    html
  })
}
export { getHtml, sendOrderEmail }
