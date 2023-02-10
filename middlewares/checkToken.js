const errorResponse = require("../helpers/errorResponse");
const { verify } = require("jsonwebtoken");
const createHttpError = require("http-errors");
const User = require("../database/models/User");

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw createHttpError(401, "Se requiere un token")
        }

        const token = req.headers.authorization;
        const decoded = verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("name");

        next()
    } catch (error) {
        error.message = "Sesión expirada"
        return errorResponse(res, error, "CHECK-TOKEN")
    }
}