const { Offer } = require("../models/index");
import { Request, Response } from "express";
const Crypto = require("crypto");

//TODO: remove randomNumber, use UUID instead
const { randomNumber } = require("../utils/utils.ts");


export async function postOffer(req: Request, res: Response) {
  try {
    console.log("Saving offer to database...");

    const authHeader: string = req.headers['Authorization']?.toString() || '';
    let [bearer, token]: string[] = [];
    if (authHeader !== '') {
      [bearer, token] = authHeader.split(' ');
    }

    if (token) {
      const offer = req.body;
      const newOffer = new Offer({
        ...offer,
        image: `https://i.pravatar.cc/200?u=${randomNumber()}@pravatar.com`,
        authorId: Crypto.randomUUID(),
      });
      const { id } = await newOffer.save();
      res.status(200);
      res.send(id);
      res.setHeader('Content-Type', 'application/json');
    } else {
      res.status(403);
      res.send('Unauthorized')
    }

  } catch (error) {
    res.status(500);
    console.log(error);
    res.send({
      data: "null",
      error: (error as Error).message,
    });
  }
}

export async function getOffers(req: Request, res: Response) {
  try {
    console.log("getting all offers from db");
    const allOffers = await Offer.find();
    // console.log(allOffers, 'allOffers')
    res.status(200);
    // res.send({
    //   data: allOffers,
    //   error: null,
    // });
    res.send(allOffers);
    res.setHeader('Content-Type', 'application/json');
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
