const { verify } = require('jsonwebtoken');
const AppError = require('../errors/AppError');
const prisma = require('../prisma');

async function ensureAuthenticated(request, response, next) {
	try {
		const authHeader = request.headers.authorization;

		if (!authHeader) {
			throw new AppError('Token is missing', 401);
		}

		const [, token] = authHeader.split(' ');

		const { sub } = verify(token, '391ac7797da75aab27f318bbe9e1d8f3');

		const [id, email] = sub.split(' ');

		const userExists = await prisma.user.findFirst({ where: { id: Number(id), email } });

		if (!userExists) {
			throw new AppError('Invalid Token', 401);
		}

		request.id = Number(id);
		request.email = email;

		next();
	} catch (error) {
		if (error instanceof AppError) {
			return response.status(error.statusCode).json({ message: error.message });
		}

		return response.status(401).json({
			message: error.message,
		});
	}
}

module.exports = ensureAuthenticated;
