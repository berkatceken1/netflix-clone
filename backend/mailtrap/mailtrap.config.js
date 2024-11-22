import {MailtrapClient} from "mailtrap";
import dotenv from "dotenv";
import { ENV_VARS } from "../config/envVars.js"

dotenv.config();

export const mailtrapClient = new MailtrapClient({
    endpoint: ENV_VARS.MAILTRAP_ENDPOINT,
    token: ENV_VARS.MAILTRAP_TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Netflix",
};

