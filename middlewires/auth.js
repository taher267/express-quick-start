import { verify } from "jsonwebtoken";
import error from "../utils/error";
export const authenticated = (req, res, nex) => {
    const { token } = req.cookies;
    if (token && verify(token, process.env.JWT_SECRET)) return nex();
    throw error(`Login in to access this rescource`);

};
export const authorized = (req, res, nex) => {

    nex();
};

export const unAuthenticated = (req, res, nex) => {
    const { token } = req.cookies;
    if (token && verify(token, process.env.JWT_SECRET)) throw error(`User is logged in`);
    nex();
};