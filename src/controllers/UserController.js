const { hash } = require('bcrypt');
const { validate } = require('isemail');
const AppError = require('../errors/AppError');
const prisma = require('../prisma');

class UserController {
	async register(request, response) {
		try {
			const { name, email, password } = request.body;

			if (!name || !email || !password) {
				throw new AppError('Missing name, email or password!', 400);
			}

			const emailAlreadyExists = await prisma.user.findFirst({
				where: {
					email,
				},
			});

			if (emailAlreadyExists) {
				throw new AppError('Email already exists!', 400);
			}

			const validEmail = validate(email);

			if (!validEmail) {
				throw new AppError('Invalid email!', 400);
			}

			const hashedPassword = await hash(password, 8);

			const user = await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
				},
			});

			delete user.password;

			return response.status(201).json(user);
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ message: error.message });
			}

			return response.status(500).json({
				status: 'error',
				message: `Internal server error - ${error.message}`,
			});
		}
	}

	async get(request, response) {
		try {
			const id = Number(request.params.id);

			const user = await prisma.user.findFirst({ where: { id } });

			if (!user) {
				throw new AppError('User not found', 404);
			}

			delete user.password;

			return response.json(user);
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ message: error.message });
			}

			return response.status(500).json({
				status: 'error',
				message: `Internal server error - ${error.message}`,
			});
		}
	}

	async list(request, response) {
		try {
			const users = await prisma.user.findMany();

			for await (let user of users) {
				delete user.password;
			}

			return response.json(users);
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ message: error.message });
			}

			return response.status(500).json({
				status: 'error',
				message: `Internal server error - ${error.message}`,
			});
		}
	}

	async update(request, response) {
		try {
			const id = Number(request.params.id);

			const { name, password, status } = request.body;

			const userExists = await prisma.user.findFirst({ where: { id } });

			if (!userExists) {
				throw new AppError('User not found', 404);
			}

			const user = {};

			if (name) {
				user.name = name;
			}

			if (password) {
				user.password = await hash(password, 8);
			}

			if (status || typeof status == 'boolean') {
				user.status = status;
			}

			const updatedUser = await prisma.user.update({
				where: { id },
				data: user,
			});

			delete updatedUser.password;

			return response.json(updatedUser);
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ message: error.message });
			}

			return response.status(500).json({
				status: 'error',
				message: `Internal server error - ${error.message}`,
			});
		}
	}

	async delete(request, response) {
		try {
			const id = Number(request.params.id);

			const userExists = await prisma.user.findFirst({ where: { id } });

			if (!userExists) {
				throw new AppError('User not found', 404);
			}

			await prisma.user.delete({
				where: { id },
			});

			return response.status(204).send();
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ message: error.message });
			}

			return response.status(500).json({
				status: 'error',
				message: `Internal server error - ${error.message}`,
			});
		}
	}
}

module.exports = { UserController };
