import path from "path";

const NODE_ENV = process.env.NODE_ENV ? "." + process.env.NODE_ENV : "";

require("dotenv").config({
  path: path.resolve(__dirname,`../config/${NODE_ENV}.env`)
});

const mongoose = require("mongoose");
const { Schema } = mongoose;
const url = process.env.DATABASE_URL;

async function main() {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

main()
  .then(() => console.log(`database running at ${url}`))
  .catch((err) => console.log("connection to db error", err));

const offerSchema = new Schema({
  author: String,
  authorId: String,
  title: String,
  image: String,
  description: String,
  comment: String,
  type: String,
});

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  image: String,
  offers: [offerSchema],
  favourite: [offerSchema],
});

const UserModel = mongoose.model("User", userSchema);
const OfferModel = mongoose.model("Offer", offerSchema);

export { UserModel, OfferModel };
