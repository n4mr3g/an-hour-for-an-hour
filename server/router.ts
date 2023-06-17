import express, { Router } from "express";

import { getOffers, postOffer } from "./controllers/offer.controller";
import { create, login, profile } from "./controllers/user.controller";
import authMiddleware from "./middleware/auth";

const router: Router = express.Router();

router.get("/offer", getOffers);
router.post("/offer", postOffer);

router.post("/signup", create);
router.post("/login", login);
router.get("/me", authMiddleware, profile);
// router.get("/user", userController.getAllUsers); //TODO this in implemented
// router.get("/user/:id", userController.getOneUser);

export default router;
