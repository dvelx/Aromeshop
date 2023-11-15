export default interface CartProducts {
  Product: {
    Brand: {
      id: number,
      image: string,
      slug: string,
      title: string
    };
    Category: {
      id: number,
      image: string,
      slug: string,
      title: string
    }
    description: string;
    id: number;
    image: string;
    price: number;
    slug: string;
    title: string;
  },
  quantity: number
}
