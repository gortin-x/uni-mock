import * as path from "path";

import {
    fileCheck,
    merge
} from "./utils/tool";

import initServer from "./server";
import defaultConfig from "./um.config.js";

const configPath = path.resolve(process.cwd() + '/um.config.js')

fileCheck(configPath).then((newConfig) => {
    const _defaultConfig = merge(defaultConfig, newConfig ? require(configPath) : {});
    initServer(_defaultConfig);
}).catch(err => {
    console.log(err);
});


