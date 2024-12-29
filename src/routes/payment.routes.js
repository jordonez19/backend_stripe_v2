import { Router } from "express";
import PaymentController from "../controller/payment.controller.js";
const router = Router();


router.get("/create-checkout-session", PaymentController.createCheckoutSession);

router.get("/subscriptions", PaymentController.getSubscriptions);
router.post("/checkout-subscriptions", PaymentController.postSubscriptions);

router.get("/success", PaymentController.successPayment);

router.get("/cancel", PaymentController.cancelPayment);

export default router;
