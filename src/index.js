import express from "express";
import Stripe from "stripe";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/router.js";
import 'dotenv/config'


const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));




routes(app);


app.listen(PORT, () => {
  console.log("server on :", PORT);
});
