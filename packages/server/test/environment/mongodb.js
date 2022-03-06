/* eslint-disable */
const { MongoMemoryServer } = require('mongodb-memory-server');
const NodeEnvironment = require('jest-environment-node');

class MongoDbEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    this.mongod = new MongoMemoryServer({
      binary: {
        version: '4.2.3',
      },
      autoStart: false,
    });
  }

  async setup() {
    await super.setup();
    await this.mongod.start();

    const uri = this.mongod.getUri();
    console.log('setup mongo connection: ', uri);

    this.global.__MONGO_URI__ = uri;
    this.global.__COUNTERS__ = {
      multipleChoice: 0,
    };
  }

  async teardown() {
    await super.teardown();
    await this.mongod.stop();
    this.mongod = null;
    this.global = {};
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoDbEnvironment;
