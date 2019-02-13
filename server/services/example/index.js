const logger = require('../../utils/logger');
const ExampleDeviceHandler = require('./lib/device');

module.exports = function ExampleService() {
  // here is an example module calling the Gladys website
  const axios = require('axios');
  const client = axios.create({
    timeout: 1000,
  });
  console.log(axios);
  /**
   * @public
   * @description This function starts the ExampleService service
   * @example
   * gladys.services.example.start();
   */
  function start() {
    logger.log('starting example service');
  }

  /**
   * @public
   * @description This function stops the ExampleService service
   * @example
   * gladys.services.example.stop();
   */
  function stop() {
    logger.log('stopping example service');
  }

  return Object.freeze({
    start,
    stop,
    device: new ExampleDeviceHandler(client),
  });
};
