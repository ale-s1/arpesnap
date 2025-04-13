import { auth } from "express-oauth2-jwt-bearer";
import config from "../config/environment.config";

const authenticateUser = auth({
	audience: config.audience,
	issuerBaseURL: config.issuer_base_url,
	tokenSigningAlg: "RS256",
});

export default authenticateUser;
