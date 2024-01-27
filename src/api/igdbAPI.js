import { generateAccessToken } from "./classes/generateAccessToken";
import { accessApi } from "./classes/accessApi";

export const tokenGenerator = new generateAccessToken();
export const apiConsumer  = new accessApi(tokenGenerator);
