export default interface Products {
  pagination: {
    page: number;
    limit: number;
    count: number;
  };
  products: {
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
  }[];
}
