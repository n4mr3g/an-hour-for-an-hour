import express, { Router } from "express";
import { getOffers, postOffer } from "./controllers/offer.controller";
import { create, login } from "./controllers/user.controller";
import authMiddleware from "./middleware/auth";

const router: Router = express.Router();

router.get("/offer", getOffers);
router.post("/offer", authMiddleware, postOffer);

router.post("/signup", create);
router.post("/login", authMiddleware, login);
//TODO: check if we need this 'profile' route
// router.get("/profile", authMiddleware, profile);


// router.post("/logout", authMiddleware, logout);
// router.get("/user", userController.getAllUsers); //TODO this in implemented
// router.get("/user/:id", userController.getOneUser);

export default router;
