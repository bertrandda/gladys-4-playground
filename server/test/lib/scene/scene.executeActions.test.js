const { assert, fake } = require('sinon');
const chaiAssert = require('chai').assert;
const { ACTIONS } = require('../../../utils/constants');
const { executeActions } = require('../../../lib/scene/scene.executeActions');

const light = {
  turnOn: fake.resolves(null),
};

describe('scene.executeActions', () => {
  it('should execute light turn on', async () => {
    await executeActions({ light }, [{
      type: ACTIONS.LIGHT.TURN_ON,
      deviceFeature: 'light-1',
    }], {});
    assert.calledWith(light.turnOn, 'light-1');
  });
  it('should execute sequential actions', async () => {
    await executeActions({ light }, [{
      type: ACTIONS.LIGHT.TURN_ON,
      deviceFeature: 'light-1',
      then: [{
        type: ACTIONS.LIGHT.TURN_ON,
        deviceFeature: 'light-1',
      }],
    }], {});
    assert.calledWith(light.turnOn, 'light-1');
  });
  it('should throw error, action type does not exist', async () => {
    const promise = executeActions({ light }, [{
      type: 'THISDOESNOTEXIST',
      deviceFeature: 'light-1',
    }], {});
    return chaiAssert.isRejected(promise, 'Action type "THISDOESNOTEXIST" does not exist.');
  });
});
