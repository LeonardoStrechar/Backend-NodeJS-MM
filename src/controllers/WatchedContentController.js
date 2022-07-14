const AppError = require('../errors/AppError');
const prisma = require('../prisma');

class WatchedContentController {
	async watch(request, response) {
		try {
			const { id } = request;
			const contentId = Number(request.params.contentId);

			const contentExists = await prisma.content.findFirst({ where: { id: contentId } });

			if (!contentExists) {
				throw new AppError('Content not found', 404);
			}

			const userAlreadyWatched = await prisma.watchedContent.findFirst({
				where: {
					user_id: id,
					content_id: contentId,
				},
				include: {
					User: true,
					Content: true,
				},
			});

			if (userAlreadyWatched) {
				return response.json(userAlreadyWatched);
			}

			const watchedContent = await prisma.watchedContent.create({
				data: {
					user_id: id,
					content_id: contentId,
				},
				include: {
					User: true,
					Content: true,
				},
			});

			return response.status(201).json(watchedContent);
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

	async unwatch(request, response) {
		try {
			const { id } = request;
			const contentId = Number(request.params.contentId);

			const userHasWatchedContent = await prisma.watchedContent.findFirst({
				where: {
					user_id: id,
					content_id: contentId,
				},
			});

			if (!userHasWatchedContent) {
				throw new AppError('Watched Content not found', 404);
			}

			await prisma.watchedContent.delete({
				where: {
					user_id_content_id: { user_id: 1, content_id: 1 },
				},
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

module.exports = { WatchedContentController };
