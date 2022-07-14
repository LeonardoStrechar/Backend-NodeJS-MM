const { hash } = require('bcrypt');
const prisma = require('../src/prisma');

async function main() {
	const hashedPassword = await hash('password', 8);

	await prisma.user.createMany({
		data: [
			{ name: 'Nome 1', email: 'email1@email.com', password: hashedPassword },
			{ name: 'Nome 2', email: 'email2@email.com', password: hashedPassword },
			{ name: 'Nome 3', email: 'email3@email.com', password: hashedPassword },
			{ name: 'Nome 4', email: 'email4@email.com', password: hashedPassword },
			{ name: 'Nome 5', email: 'email5@email.com', password: hashedPassword },
		],
	});

	await prisma.course.createMany({
		data: [
			{ title: 'Título 1', description: 'Descrição 1', creator_id: 1 },
			{ title: 'Título 2', description: 'Descrição 2', creator_id: 1 },
			{ title: 'Título 3', description: 'Descrição 3', creator_id: 2 },
		],
	});

	await prisma.module.createMany({
		data: [
			{ title: 'Título 1', description: 'Descrição 1', course_id: 1, creator_id: 1 },
			{ title: 'Título 2', description: 'Descrição 2', course_id: 1, creator_id: 1 },
			{ title: 'Título 3', description: 'Descrição 3', course_id: 1, creator_id: 1 },
			{ title: 'Título 4', description: 'Descrição 4', course_id: 1, creator_id: 1 },
			{ title: 'Título 5', description: 'Descrição 5', course_id: 1, creator_id: 1 },

			{ title: 'Título 6', description: 'Descrição 6', course_id: 2, creator_id: 2 },
			{ title: 'Título 7', description: 'Descrição 7', course_id: 2, creator_id: 2 },
			{ title: 'Título 8', description: 'Descrição 8', course_id: 2, creator_id: 2 },

			{ title: 'Título 9', description: 'Descrição 9', course_id: 3, creator_id: 3 },
			{ title: 'Título 10', description: 'Descrição 10', course_id: 3, creator_id: 3 },
		],
	});

	await prisma.content.createMany({
		data: [
			{ title: 'Título 1', content: 'Conteúdo 1', module_id: 1, creator_id: 1 },
			{ title: 'Título 2', content: 'Conteúdo 2', module_id: 2, creator_id: 1 },
			{ title: 'Título 3', content: 'Conteúdo 3', module_id: 3, creator_id: 1 },

			{ title: 'Título 4', content: 'Conteúdo 4', module_id: 6, creator_id: 2 },
			{ title: 'Título 5', content: 'Conteúdo 5', module_id: 6, creator_id: 2 },
			{ title: 'Título 6', content: 'Conteúdo 6', module_id: 7, creator_id: 2 },
			{ title: 'Título 7', content: 'Conteúdo 7', module_id: 7, creator_id: 2 },
			{ title: 'Título 8', content: 'Conteúdo 8', module_id: 8, creator_id: 2 },

			{ title: 'Título 9', content: 'Conteúdo 9', module_id: 9, creator_id: 3 },
			{ title: 'Título 10', content: 'Conteúdo 10', module_id: 9, creator_id: 3 },
			{ title: 'Título 11', content: 'Conteúdo 11', module_id: 10, creator_id: 3 },
			{ title: 'Título 12', content: 'Conteúdo 12', module_id: 10, creator_id: 3 },
		],
	});

	await prisma.watchedContent.createMany({
		data: [
			{ content_id: 2, user_id: 1 },
			{ content_id: 2, user_id: 3 },
		],
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
