require("dotenv").config();

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
  offer: String,
  image: String,
  message: String,
  comment: String,
  type: String,
  //   createdAt: Date,
});

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  image: String,
  offers: [offerSchema],
  favourite: [offerSchema],
});

const User = mongoose.model("User", userSchema);
const Offer = mongoose.model("Offer", offerSchema);

export { User, Offer };
