export interface Offer {
  author: string,
  // authorId: String,
  title: string,
  image: string,
  message: string,
  comment: string,
  type: string,
}

export interface User {
  name: string,
  email: string,
  password: string,
  image: string
}
