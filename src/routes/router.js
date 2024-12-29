
import paymentRoutes from "./payment.routes.js";

export default function (app) {
  app.use("/payment", paymentRoutes);
}


