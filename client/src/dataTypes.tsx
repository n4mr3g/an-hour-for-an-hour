export type Offer = {
  author: string;
  title: string;
  image: string;
  description: string;
  comment: string;
  type: string;
};

export type User = {
  name: string;
  email: string;
  password: string;
  image: string;
};

export type UserFromBackend = {
  name: string;
  email: string;
  image: string;
  offers: Offer[];
};

export type LoginData = {
  email: string;
  password: string;
};
