import * as path from "path";

import {
    fileCheck,
    merge
} from "./utils/tool";

import initServer from "./server";
import defaultConfig from "./um.config.js";

const configPath = path.resolve(process.cwd(), './um.config.js')

fileCheck(configPath).then((newConfig) => {
    const incomingConfig = require(configPath);
    const _defaultConfig = merge(defaultConfig, newConfig ? incomingConfig : {});
    initServer(_defaultConfig);
}).catch(err => {
    console.log(err);
});


