const AppError = require('../errors/AppError');
const prisma = require('../prisma');

class ModuleController {
	async create(request, response) {
		try {
			const { id } = request;
			const { title, description, courseId } = request.body;

			if (!title || !description || !courseId) {
				throw new AppError('Missing title, description or courseId!', 400);
			}

			const courseExists = await prisma.course.findFirst({ where: { id: courseId } });

			if (!courseExists) {
				throw new AppError('Course not found', 404);
			}

			const courseModule = await prisma.module.create({
				data: {
					title,
					description,
					course_id: courseId,
					creator_id: id,
				},
				include: {
					Course: true,
					Creator: true,
				},
			});

			return response.status(201).json(courseModule);
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
			const { id } = request.params;

			const courseModule = await prisma.module.findFirst({
				where: { id: Number(id) },
				include: {
					Creator: true,
					Course: true,
				},
			});

			if (!courseModule) {
				throw new AppError('Module not found', 404);
			}

			return response.json(courseModule);
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
			const modules = await prisma.module.findMany({
				include: {
					Creator: true,
					Course: true,
				},
			});

			return response.json(modules);
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

			const { title, description, courseId } = request.body;

			const moduleExists = await prisma.module.findFirst({ where: { id } });

			if (!moduleExists) {
				throw new AppError('Module not found', 404);
			}

			const courseModule = {};

			if (title) {
				courseModule.title = title;
			}

			if (description) {
				courseModule.description = description;
			}

			if (courseId) {
				const courseExists = await prisma.course.findFirst({ where: { id: courseId } });

				if (!courseExists) {
					throw new AppError('Course not found', 404);
				}

				courseModule.course_id = courseId;
			}

			const updatedModule = await prisma.module.update({
				where: { id },
				data: courseModule,
				include: {
					Creator: true,
					Course: true,
				},
			});

			return response.json(updatedModule);
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

			const moduleExists = await prisma.module.findFirst({ where: { id } });

			if (!moduleExists) {
				throw new AppError('Module not found', 404);
			}

			await prisma.module.delete({
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

module.exports = { ModuleController };
