export type Offer = {
  author: string;
  authorId: string;
  title: string;
  image: string;
  description: string;
  comment: string;
  type: string;
};

export type User = {
  name: string;
  email: string;
  profilePicture: string;
  offers: Offer[];
  favorites: Offer[];
};
