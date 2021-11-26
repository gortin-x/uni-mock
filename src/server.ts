import * as http from "http";
import * as path from "path";
import chalk from "chalk";

import {
    isMock,
    formatUrl,
    getMockData,
} from "./utils/tool";

export default function initServer(config) {
    const whiteList:string[] = config.whiteList || [];

    const server = http.createServer(async (req, res) => {
        if (whiteList.indexOf(req.headers.host) > -1) {
            res.setHeader('Access-Control-Allow-Origin', "" + req.headers.origin);
        } else {
            res.setHeader('Access-Control-Allow-Origin', "*");
        }
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        // 预请求快速返回
        // if (req.method == "OPTIONS") {
        //     res.writeHead(200);
        //     res.end();
        // }

        if (req.url.match(/(.jpg|.png|.ico)$/g) || req.url.match(/(.mjs|.js|.map)$/g)) return;

        // mock data
        if (isMock(req.url, config['suffix'])) {
            let formatedUrl = formatUrl(req.url);
            let _originUrl = formatedUrl["url"];
            let _originParams = formatedUrl["params"]
            
            let body = "",
                url = path.join(config["path"], config['suffix'] === "/" ? _originUrl : _originUrl.split(config['suffix'])[1]);

            req.on("data", chunk => {
                body += chunk;
            });

            req.on('end', () => {
                getMockData(path.join(process.cwd(), url), JSON.stringify(_originParams), data => {
                    res.write(data);
                    res.end();
                });
            })
        }

        // 主页
        else if (req.url == "/") {
            res.end("Uni Mock Serve Is Runing...");
        }

        // 错误
        else {
            res.end("OOPS! Uni Mock Serve Has Failed");
        }
    });

    server.listen(config.port, config.host, () => {
        console.log(chalk`
        {green ————————————————————————————————— }
            {green.bold 🚢  uni-mock }
            {green 本地服务启动成功！}
            {green host：}{green.bold ${config.host}}
            {green port：}{green.bold ${config.port}}
        {green ————————————————————————————————— }
        `)
    });
}
