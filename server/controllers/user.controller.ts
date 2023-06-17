import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index";
import randomNumber from "../utils/utils";

const SECRET_KEY: string = process.env.SECRET_KEY || "thisIsNotSafe";

export async function create(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user)
    return res.status(409).send({ error: "409", data: "User already exits" });

  try {
    if (password === "") throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      image: `https://i.pravatar.cc/200?u=${randomNumber()}@pravatar.com`,
    });

    const { id } = await newUser.save();

    const accessToken = jwt.sign({ id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error, data: "Could not create user" });
  }
};

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const validatePass = await bcrypt.compare(password, user.password);
    if (!validatePass) throw new Error();
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    res.status(200);
    res.send({ accessToken });
  } catch (error) {
    res.status(401);
    res.send({ error, data: "User not found" });
  }
};

export async function profile(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    const { id, name, email, image, offers, favourite } = user;
    // const user = { id, name, email, image, offers, favourite };
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ error, data: "Resource not found" });
  }
};


//TODO: this is old code, check if it is needed
// export async function signup(req: Request, res: ) {
//   try {
//     const newUser = await User.create(req.body);
//     res.status(201);
//     res.send({
//       error: null,
//       data: {
//         user: newUser,
//       },
//     });
//   } catch (error) {
//     res.status(500);
//     res.send({ data: null, error: error });
//   }
// };

// export async function getAllUsers = (req: Request, res: ) {
//   res.status(500);
//   res.send({
//     data: null,
//     error: "This route is not yet created",
//   });
// };
