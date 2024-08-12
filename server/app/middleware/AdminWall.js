const { decodeJWT } = require("../Helpers/jwtHelpers");

const adminWall = async (req, res, next) => {
  try {
    const token = req.cookies?.auth_token;

    if (!token) {
      return res.status(401).json({ message: "Token invalide ou manquant" });
    }

    const decodedToken = await decodeJWT(token);

    if (decodedToken.role !== "Admin") {
      return res.status(403).json({ message: "Vous n'avez pas accès à ceci" });
    }

    req.user = decodedToken;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};
module.exports = adminWall;
