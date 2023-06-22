import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/index";
import randomNumber from "../utils/utils";
import { User } from "../types/User";

const SECRET_KEY: string = process.env.SECRET_KEY || "thisIsNotSafe";

export async function create(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res
        .status(409)
        .send({ error: "User already exists", status: 409 });
    }

    if (password === "") throw new Error();

    const hash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      image: `https://i.pravatar.cc/200?u=${randomNumber()}@pravatar.com`,
    });
    const { id } = await newUser.save();
    const accessToken = jwt.sign({ id }, SECRET_KEY);
    res.status(201).send(JSON.stringify(accessToken));
  } catch (error) {
    res.status(400).send({ error: "Could not create user", status: 400 });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // We search for the user in the database
    const user = await UserModel.findOne({ email });

    // If the user is not found, we throw an error
    if (!user) {
      throw new Error("User not found");
    }

    // If the user is found, we validate the password
    const validatePass = await bcrypt.compare(password, user?.password);

    // If the password is not valid, we throw an error
    if (!validatePass) throw new Error("Invalid login");

    // If the password is valid, we create a token
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);

    // We compose the user data for the client
    const userDataForClient = composeUserDataForClient(user, accessToken);

    // We send the token to the client
    res.status(200).send(userDataForClient);
  } catch (error) {
    res.status(401).send({ error: "Invalid login", status: 401 });
  }
}

function composeUserDataForClient(user: User, accessToken: string) {
  const { name, email, profilePicture, offers, favorites } = user;
  const newUser = { name, email, profilePicture, offers, favorites };
  const responseObject = { user: newUser, accessToken: accessToken };
  return responseObject;
}

export async function profile(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ error: "Resource not found", status: 404 });
  }
}
