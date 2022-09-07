export type CardItem = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  Category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

export type CardItems = CardItem[];
