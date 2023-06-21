export type Offer = {
  author: string,
  // authorId: String,
  title: string,
  image: string,
  message: string,
  comment: string,
  type: string,
}

export type User = {
  name: string,
  email: string,
  password: string,
  image: string
}

export type UserFromBackend = {
  name: string,
  email: string,
  image: string,
  offers: Offer[]
}

export type LoginData = {
  email: string,
  password: string,
}