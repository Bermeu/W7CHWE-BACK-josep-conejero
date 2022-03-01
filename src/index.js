require("dotenv").config();
const debug = require("debug")("redsocial:root");
const app = require("./server/index");
const connectToDataBase = require("./database/index");
const riseTheServer = require("./riseTheServer");

const port = process.env.PORT || 4000;
const mongoConnection = process.env.MONGO_STRING_PRODUCTION;

(async () => {
  try {
    await connectToDataBase(mongoConnection);

    await riseTheServer(port, app);
  } catch (error) {
    debug(`Error: ${error.message}`);
  }
})();
