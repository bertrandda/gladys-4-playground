const express = require('express');
const CalendarController = require('./controllers/calendar.controller');
const UserController = require('./controllers/user.controller');
const HouseController = require('./controllers/house.controller');
const LightController = require('./controllers/light.controller');
const LocationController = require('./controllers/location.controller');
const MessageController = require('./controllers/message.controller');
const RoomController = require('./controllers/room.controller');
const SessionController = require('./controllers/session.controller');
const ServiceController = require('./controllers/service.controller');
const SceneController = require('./controllers/scene.controller');
const TriggerController = require('./controllers/trigger.controller');
const VariableController = require('./controllers/variable.controller');
const WeatherController = require('./controllers/weather.controller');
const AuthMiddleware = require('./middlewares/authMiddleware');
const CorsMiddleware = require('./middlewares/corsMiddleware');
const setupServiceRoutes = require('./servicesRoutes');

/**
 * @description Setup the routes.
 * @param {Object} gladys - Gladys library.
 * @returns {Object} Express router.
 * @example
 * setupRoutes(gladys);
 */
function setupRoutes(gladys) {
  const router = express.Router();
  // Configure router
  const calendarController = CalendarController(gladys);
  const lightController = LightController(gladys);
  const locationController = LocationController(gladys);
  const userController = UserController(gladys);
  const houseController = HouseController(gladys);
  const messageController = MessageController(gladys);
  const roomController = RoomController(gladys);
  const variableController = VariableController(gladys);
  const sessionController = SessionController(gladys);
  const serviceController = ServiceController(gladys);
  const sceneController = SceneController(gladys);
  const triggerController = TriggerController(gladys);
  const weatherController = WeatherController(gladys);
  const authMiddleware = AuthMiddleware(gladys.config.jwtSecret, 'dashboard:write', gladys.cache, gladys.user);
  const resetPasswordAuthMiddleware = AuthMiddleware(gladys.config.jwtSecret, 'reset-password:write', gladys.cache, gladys.user);

  // enable cross origin requests
  router.use(CorsMiddleware);

  // open routes
  router.post('/api/v1/login', userController.login);
  router.post('/api/v1/access_token', userController.getAccessToken);
  router.post('/api/v1/forgot_password', userController.forgotPassword);
  router.post('/api/v1/reset_password', resetPasswordAuthMiddleware, userController.resetPassword);

  // todo: add check if one account already exist.
  router.post('/api/v1/user', userController.create);

  // we load all services routes
  setupServiceRoutes(gladys, router, authMiddleware);

  // after this, all requests to /api must have authenticated
  router.use('/api/*', authMiddleware);

  // calendar
  router.post('/api/v1/calendar', calendarController.create);
  router.patch('/api/v1/calendar/:calendar_selector', calendarController.update);
  router.delete('/api/v1/calendar/:calendar_selector', calendarController.destroy);
  router.post('/api/v1/calendar/:calendar_selector/event', calendarController.createEvent);
  router.patch('/api/v1/calendar/event/:calendar_event_selector', calendarController.updateEvent);
  router.delete('/api/v1/calendar/event/:calendar_event_selector', calendarController.destroyEvent);

  // house
  router.post('/api/v1/house', houseController.create);
  router.patch('/api/v1/house/:house_selector', houseController.update);
  router.get('/api/v1/house', houseController.get);
  router.delete('/api/v1/house/:house_selector', houseController.destroy);
  router.get('/api/v1/house/:house_selector/room', houseController.getRooms);
  router.post('/api/v1/house/:house_selector/user/:user_selector/seen', houseController.userSeen);

  // room
  router.post('/api/v1/house/:house_selector/room', roomController.create);
  router.patch('/api/v1/room/:room_selector', roomController.update);
  router.delete('/api/v1/room/:room_selector', roomController.destroy);

  // message
  router.post('/api/v1/message', messageController.create);

  // service
  router.post('/api/v1/service/:service_name/start', serviceController.start);
  router.post('/api/v1/service/:service_name/stop', serviceController.stop);

  // user
  router.get('/api/v1/user', userController.getUsers);
  router.get('/api/v1/me', userController.getMySelf);
  router.patch('/api/v1/me', userController.updateMySelf);
  router.get('/api/v1/me/picture', userController.getMyPicture);

  // location
  router.post('/api/v1/user/:user_selector/location', locationController.create);
  router.get('/api/v1/user/:user_selector/location', locationController.getLocationsUser);

  // variable
  router.post('/api/v1/service/:service_name/:variable_key', variableController.setForLocalService);

  // session
  router.post('/api/v1/session/:session_id/revoke', sessionController.revoke);

  // light
  router.post('/api/v1/light/:device_selector/on', lightController.turnOn);

  // scene
  router.post('/api/v1/scene', sceneController.create);
  router.get('/api/v1/scene', sceneController.get);
  router.patch('/api/v1/scene/:scene_selector', sceneController.update);
  router.delete('/api/v1/scene/:scene_selector', sceneController.destroy);

  // trigger
  router.post('/api/v1/trigger', triggerController.create);
  router.get('/api/v1/trigger', triggerController.get);
  router.patch('/api/v1/trigger/:trigger_selector', triggerController.update);
  router.delete('/api/v1/trigger/:trigger_selector', triggerController.destroy);

  // weather
  router.get('/api/v1/user/:user_selector/weather', weatherController.getByUser);
  router.get('/api/v1/house/:house_selector/weather', weatherController.getByHouse);

  return router;
}

module.exports = {
  setupRoutes,
};
