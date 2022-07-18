const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const AppError = require("../errors/AppError");
const prisma = require("../prisma");

class AuthenticateController {
	async login(request, response) {
		try {
			const { email, password } = request.body;

			if (!email || !password) {
				throw new AppError("Missing email or password!", 400);
			}

			const user = await prisma.user.findFirst({
				where: {
					email,
				},
			});

			if (!user) {
				throw new AppError("Incorrect email or password!", 400);
			}

			const passwordMatch = await compare(password, user.password);

			if (!passwordMatch) {
				throw new AppError("Incorrect email or password!", 400);
			}

			const token = sign({}, "391ac7797da75aab27f318bbe9e1d8f3", {
				subject: `${user.id} ${user.email}`,
				expiresIn: "1d",
			});

			return response.status(201).json({
				token,
				user: {
					name: user.name,
					email: user.email,
				},
			});
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ message: error.message });
			}

			return response.status(500).json({
				status: "error",
				message: `Internal server error - ${error.message}`,
			});
		}
	}
}

module.exports = { AuthenticateController };
