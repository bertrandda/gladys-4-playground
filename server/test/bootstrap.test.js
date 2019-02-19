const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const server = require('../api/');
const Gladys = require('../lib');
const logger = require('../utils/logger');
const { seedDb, cleanDb } = require('./helpers/db.test');

chai.use(chaiAsPromised);

const SERVER_PORT = 6500;

process.env.JWT_SECRET = 'secret';

before(async () => {
  const gladys = Gladys();
  await gladys.start();
  // @ts-ignore
  global.TEST_BACKEND_APP = server.start(gladys, SERVER_PORT);
});

// cleaning and filling database between each tests
beforeEach(async () => {
  try {
    await cleanDb();
    await seedDb();
  } catch (e) {
    logger.trace(e);
    throw e;
  }
});
