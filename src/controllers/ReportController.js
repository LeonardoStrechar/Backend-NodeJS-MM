const AppError = require('../errors/AppError');
const prisma = require('../prisma');

class ReportController {
	async report1(request, response) {
		try {
			const users = await prisma.user.findMany({
				include: {
					_count: {
						select: { Course: true },
					},
				},
				orderBy: {
					Course: {
						_count: 'desc',
					},
				},
			});

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

	async report2(request, response) {
		try {
			const users = await prisma.user.findMany({
				include: {
					_count: {
						select: { Content: true },
					},
				},
				orderBy: {
					Content: {
						_count: 'desc',
					},
				},
			});

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

	async report3(request, response) {
		try {
			const courses = await prisma.course.findMany({
				include: {
					_count: {
						select: { Module: true },
					},
					Module: {
						include: {
							_count: {
								select: { Content: true },
							},
						},
					},
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

	async report4(request, response) {
		try {
			const contents = await prisma.content.findMany({
				include: {
					Module: {
						include: {
							Course: {
								select: {
									id: true,
									title: true,
								},
							},
						},
					},
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

	async report5(request, response) {
		try {
			const users = await prisma.user.findMany({
				include: {
					WatchedContents: true,
				},
				where: {
					WatchedContents: {
						some: {
							content_id: 2,
						},
					},
				},
			});

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
}

module.exports = { ReportController };
