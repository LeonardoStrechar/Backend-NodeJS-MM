const AppError = require('../errors/AppError');
const prisma = require('../prisma');

class CourseController {
	async create(request, response) {
		try {
			const { id } = request;
			const { title, description } = request.body;

			if (!title || !description) {
				throw new AppError('Missing title or description!', 400);
			}

			const course = await prisma.course.create({
				data: {
					title,
					description,
					creator_id: id,
				},
				include: {
					Creator: true,
				},
			});

			return response.status(201).json(course);
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

			const course = await prisma.course.findFirst({
				where: { id: Number(id) },
				include: {
					Creator: true,
					Module: true,
				},
			});

			if (!course) {
				throw new AppError('Course not found', 404);
			}

			return response.json(course);
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
			const courses = await prisma.course.findMany({
				include: {
					Creator: true,
					Module: true,
				},
			});

			return response.json(courses);
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

			const { title, description } = request.body;

			const courseExists = await prisma.course.findFirst({
				where: { id },
				include: {
					Creator: true,
					Module: true,
				},
			});

			if (!courseExists) {
				throw new AppError('Course not found', 404);
			}

			const course = {};

			if (title) {
				course.title = title;
			}

			if (description) {
				course.description = description;
			}

			const updatedCourse = await prisma.course.update({
				where: { id },
				data: course,
			});

			return response.json(updatedCourse);
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

			const courseExists = await prisma.course.findFirst({ where: { id } });

			if (!courseExists) {
				throw new AppError('Course not found', 404);
			}

			await prisma.course.delete({
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

module.exports = { CourseController };
