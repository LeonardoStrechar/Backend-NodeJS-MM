const { hash } = require('bcrypt');
const prisma = require('../src/prisma');

async function main() {
	const hashedPassword = await hash('password', 8);

	await prisma.user.createMany({
		data: [
			{ name: 'Felipe', email: 'felipe@email.com', password: hashedPassword },
			{ name: 'Leonardo', email: 'leonardo@email.com', password: hashedPassword },
			{ name: 'Lucas', email: 'lucas@email.com', password: hashedPassword },
			{ name: 'Guilherme', email: 'guilherme@email.com', password: hashedPassword },
			{ name: 'Matheus', email: 'matheus@email.com', password: hashedPassword },
		],
	});

	await prisma.course.createMany({
		data: [
			{ title: 'Ingles', description: '100 horas', creator_id: 1 },
			{ title: 'Desenvolvimento', description: '200 horas', creator_id: 1 },
			{ title: 'Matematica', description: '300 horas', creator_id: 2 },
		],
	});

	await prisma.module.createMany({
		data: [
			{ title: 'Introdução', description: '10 horas', course_id: 1, creator_id: 1 },
			{ title: 'Saudações', description: '10 horas', course_id: 1, creator_id: 1 },
			{ title: 'Viagem', description: '10 horas', course_id: 1, creator_id: 1 },
			{ title: 'Encontros', description: '10 horas', course_id: 1, creator_id: 1 },
			{ title: 'Familia', description: '10 horas', course_id: 1, creator_id: 1 },

			{ title: 'NodeJS', description: '100 horas', course_id: 2, creator_id: 2 },
			{ title: 'PHP', description: '100 horas', course_id: 2, creator_id: 2 },
			{ title: 'Python', description: '100 horas', course_id: 2, creator_id: 2 },

			{ title: 'Adição', description: '50 horas', course_id: 3, creator_id: 3 },
			{ title: 'Subtração', description: '50 horas', course_id: 3, creator_id: 3 },
		],
	});

	await prisma.content.createMany({
		data: [
			{ title: 'Escrita', content: '10 horas', module_id: 1, creator_id: 1 },
			{ title: 'Fala', content: '10 horas', module_id: 2, creator_id: 1 },
			{ title: 'Gestos', content: '10 horas', module_id: 3, creator_id: 1 },

			{ title: 'Express', content: '10 horas', module_id: 6, creator_id: 2 },
			{ title: 'Routes', content: '10 horas', module_id: 6, creator_id: 2 },
			{ title: 'Dotenv', content: '10 horas', module_id: 7, creator_id: 2 },
			{ title: 'Nodemon', content: '10 horas', module_id: 7, creator_id: 2 },
			{ title: 'Prisma', content: '10 horas', module_id: 8, creator_id: 2 },

			{ title: '2 numeros', content: '1 hora', module_id: 9, creator_id: 3 },
			{ title: '3 numeros', content: '1 hora', module_id: 9, creator_id: 3 },
			{ title: '4 numeros', content: '1 hora', module_id: 10, creator_id: 3 },
			{ title: '5 numeros', content: '1 hora', module_id: 10, creator_id: 3 },
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
