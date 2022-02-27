require("dotenv").config();
const debug = require("debug")("redsocial:root");
const connectToDataBase = require("./database/index");
/* const app = require("./server/index");
const risetheServer = require("./server/riseTheServer"); */

const port = process.env.PORT || 4000;
const mongoConnection = process.env.MONGO_STRING_PRODUCTION;

(async () => {
  try {
    await connectToDataBase(mongoConnection);

    await risetheServer(port, app);
  } catch (error) {
    debug(`Error: ${error.message}`);
  }
})();
