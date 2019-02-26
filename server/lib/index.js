const { generateJwtSecret } = require('../utils/jwtSecret');
const { Cache } = require('../utils/cache');
const Brain = require('./brain');
const Event = require('./event');
const MessageHandler = require('./message');
const Service = require('./service');
const Session = require('./session');
const User = require('./user');
const Light = require('./light');
const Variable = require('./variable');

/**
 * @description Start a new Gladys instance
 * @param {Object} config - Configuration when starting Gladys.
 * @param {string} [config.jwtSecret] - A secret to generate jsonwebtoken.
 * @param {boolean} [config.disableService] - If true, disable the loading of services.
 * @param {boolean} [config.disableBrainLoading] - If true, disable the loading of the brain.
 * @example
 * const gladys = Gladys();
 */
function Gladys(config) {
  config.jwtSecret = config.jwtSecret || generateJwtSecret();

  const brain = new Brain();
  const cache = new Cache();
  const event = new Event();
  const service = new Service();
  const message = new MessageHandler(event, brain, service);
  const user = new User();
  const session = new Session(config.jwtSecret);
  const light = new Light(event, message);
  const variable = new Variable();

  const gladys = {
    version: '0.1.0', // todo, read package.json
    event,
    message,
    user,
    service,
    session,
    cache,
    config,
    light,
    variable,
    start: async () => {
      if (!config.disableBrainLoading) {
        await brain.load();
      }
      if (!config.disableService) {
        await service.load(gladys);
        await service.startAll();
      }
    },
  };

  // freeze Gladys object to ensure it's not modified
  return Object.freeze(gladys);
}

module.exports = Gladys;
