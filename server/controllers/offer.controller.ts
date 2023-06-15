const { Offer } = require("../models/index");
import { Request, Response } from "express";
const Crypto = require("crypto");

//TODO: remove randomNumber, use UUID instead
const { randomNumber } = require("../utils/utils.ts");


export async function postOffer(req: Request, res: Response) {
  try {
    console.log("Saving offer to database...");
    const offer = req.body;
    const newOffer = new Offer({
      ...offer,
      image: `https://i.pravatar.cc/200?u=${randomNumber()}@pravatar.com`,
      authorId: Crypto.randomUUID(),
    });
    const { id } = await newOffer.save();
    res.status(200);
    res.send({ data: id, error: null });
  } catch (error) {
    res.status(500);
    console.log(error);
    res.send({
      data: "null",
      error: (error as Error).message,
    });
  }
}

export async function getOffer(req: Request, res: Response) {
  try {
    console.log("getting all offers from db");
    const allOffers = await Offer.find();
    res.status(200);
    res.send({
      data: allOffers,
      error: null,
    });
  } catch (error) {
    res.status(500);
    console.error(error);
    res.send({
      data: "null",
      error: (error as Error).message,
    });
  }

  //TODO need to add the patch, update and delete paths as well.
}
