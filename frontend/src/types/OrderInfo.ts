export default interface OrderInfo {
  address: string,
  comment: string,
  date_finished: string,
  date_purchased: string,
  email: string,
  id: number,
  name: string,
  phone: string,
  status_id: number,
  total: string,
  items: {
    id: number,
    order_id: number,
    price: string,
    product_id: number,
    product_title: string,
    quantity: number,
    product: {
      brand_id: number;
      brand_title: string;
      category_id: number;
      category_name: string;
      description: string;
      id: number;
      image_url: string;
      price: number;
      slug: string;
      title: string;
    }[]
  }
}
