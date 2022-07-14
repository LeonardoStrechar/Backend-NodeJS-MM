const { Router } = require('express');
const { AuthenticateController } = require('./controllers/AuthenticateController');
const { ContentController } = require('./controllers/ContentController');
const { CourseController } = require('./controllers/CourseController');
const { ModuleController } = require('./controllers/ModuleController');
const { ReportController } = require('./controllers/ReportController');
const { UserController } = require('./controllers/UserController');
const { WatchedContentController } = require('./controllers/WatchedContentController');
const ensureAuthenticated = require('./middlewares/ensureAuthenticated');

const router = new Router();

const authenticateController = new AuthenticateController();
const userController = new UserController();
const courseController = new CourseController();
const moduleController = new ModuleController();
const contentController = new ContentController();
const watchedContentController = new WatchedContentController();
const reportController = new ReportController();

// Open Routes
router.post('/register', userController.register);
router.post('/login', authenticateController.login);

// Authenticated routes
// User related routes
router.get('/users/:id', ensureAuthenticated, userController.get);
router.get('/users', ensureAuthenticated, userController.list);
router.put('/users/:id', ensureAuthenticated, userController.update);
router.delete('/users/:id', ensureAuthenticated, userController.delete);

// Course related routes
router.post('/courses', ensureAuthenticated, courseController.create);
router.get('/courses/:id', ensureAuthenticated, courseController.get);
router.get('/courses', ensureAuthenticated, courseController.list);
router.put('/courses/:id', ensureAuthenticated, courseController.update);
router.delete('/courses/:id', ensureAuthenticated, courseController.delete);

// Module related routes
router.post('/modules', ensureAuthenticated, moduleController.create);
router.get('/modules/:id', ensureAuthenticated, moduleController.get);
router.get('/modules', ensureAuthenticated, moduleController.list);
router.put('/modules/:id', ensureAuthenticated, moduleController.update);
router.delete('/modules/:id', ensureAuthenticated, moduleController.delete);

// Content related routes
router.post('/contents', ensureAuthenticated, contentController.create);
router.get('/contents/:id', ensureAuthenticated, contentController.get);
router.get('/contents', ensureAuthenticated, contentController.list);
router.put('/contents/:id', ensureAuthenticated, contentController.update);
router.delete('/contents/:id', ensureAuthenticated, contentController.delete);

// Watch Content related routes
router.post('/watch/:contentId', ensureAuthenticated, watchedContentController.watch);
router.post('/unwatch/:contentId', ensureAuthenticated, watchedContentController.unwatch);

// Reports related routes
router.get('/report/1', ensureAuthenticated, reportController.report1);
router.get('/report/2', ensureAuthenticated, reportController.report2);
router.get('/report/3', ensureAuthenticated, reportController.report3);
router.get('/report/4', ensureAuthenticated, reportController.report4);
router.get('/report/5', ensureAuthenticated, reportController.report5);

module.exports = router;
