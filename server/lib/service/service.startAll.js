
/**
 * @public
 * @description Start all services
 * @returns {Promise} - Resolve when all services are started.
 * @example
 * service.startAll();
 */
async function startAll() {
  return Promise.all(
    Object.keys(this.services).map(serviceKey => this.services[serviceKey].start()),
  );
}

module.exports = {
  startAll,
};
