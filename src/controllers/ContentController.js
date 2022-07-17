const AppError = require('../errors/AppError');
const prisma = require('../prisma');

class ContentController {
	async create(request, response) {
		try {
			const { id } = request;
			const { title, content } = request.body;
			const moduleId = Number(request.body.moduleId);

			if (!title || !content || !moduleId) {
				throw new AppError('Missing title, content or moduleId!', 400);
			}

			const moduleExists = await prisma.module.findFirst({ where: { id: moduleId } });

			if (!moduleExists) {
				throw new AppError('Module not found', 404);
			}

			const moduleContent = await prisma.content.create({
				data: {
					title,
					content,
					module_id: moduleId,
					creator_id: id,
				},
				include: {
					Module: true,
				},
			});

			return response.status(201).json(moduleContent);
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ message: error.message });
			}

			console.log(error.message);
			return response.status(500).json({
				status: 'error',
				message: `Internal server error - ${error.message}`,
			});
		}
	}

	async get(request, response) {
		try {
			const { id } = request.params;

			const courseModule = await prisma.content.findFirst({
				where: { id: Number(id) },
				include: {
					Module: true,
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
			const contents = await prisma.content.findMany({
				include: {
					Module: true,
				},
			});

			return response.json(contents);
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

			const { title, content } = request.body;
			const moduleId = Number(request.body.moduleId);

			const contentExists = await prisma.content.findFirst({ where: { id } });

			if (!contentExists) {
				throw new AppError('Module not found', 404);
			}

			const moduleContent = {};

			if (title) {
				moduleContent.title = title;
			}

			if (content) {
				moduleContent.content = content;
			}

			if (moduleId) {
				const moduleExists = await prisma.module.findFirst({ where: { id: moduleId } });

				if (!moduleExists) {
					throw new AppError('Module not found', 404);
				}

				moduleContent.module_id = moduleId;
			}

			const updatedContent = await prisma.content.update({
				where: { id },
				data: moduleContent,
				include: {
					Module: true,
				},
			});

			return response.json(updatedContent);
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

			const contentExists = await prisma.content.findFirst({ where: { id } });

			if (!contentExists) {
				throw new AppError('Content not found', 404);
			}

			await prisma.content.delete({
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

module.exports = { ContentController };
