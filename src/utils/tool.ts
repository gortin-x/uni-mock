import * as fs from "fs";

const JS_EXT = ".js";
const JSON_EXT = ".json";

async function readPage(filePath: string = '', callback: Function, check: boolean = true) {
    if (check) {
        fileCheck(filePath).then(isExist => {
            isExist ? fs.readFile(filePath, function (err, data) {
                if (err) {
                    console.log(err)
                    callback(err, false);
                } else {
                    callback(err, data)
                }
            }) : ''
        })
    }
}

function readImage(filePath = '', callback) {
    fileCheck(filePath, res => {
        if (res) {
            var stream = fs.createReadStream(filePath);
            var responseData = []; //存储文件流
            if (stream) { //判断状态
                stream.on('data', function (chunk) {
                    responseData.push(chunk);
                });
                stream.on('end', function () {
                    var finalData = Buffer.concat(responseData);
                    callback(false, finalData);
                });
                stream.on('error', function (err) {
                    console.log(err)
                    callback(err, false);
                });
            }
        }
    })

}

export function fileCheck(file, callback?: Function) {
    // 检查当前目录中是否存在该文件。
    return new Promise((resolve, reject) => {
        fs.access(file, fs.constants.F_OK & fs.constants.R_OK, (err) => {
            if (err) {
                // console.log("file check:"+ file)
                // console.log("file check:" + err)
                resolve(false);
                return false;
            } else {
                resolve(true);
                return true;
            }
        });
    })

}

export function isMock(url: string, suffix: string): boolean {
    return url.indexOf(suffix) > -1
}

interface IUrl {
    url: string,
    params: null | object
}

export function formatUrl(url: string): IUrl {
    if (url.indexOf('?') < 0)
        return {
            url: url,
            params: null
        }

    let urlToArr: string[] = url.split("?");
    let originUrl: string = urlToArr[0],
        originParams: string = urlToArr[1];

    let params: object = paramsStrToObj(originParams)
    return {
        url: originUrl,
        params: params
    }
}

export function paramsStrToObj(paramsStr: string): object {
    let obj: object = {};
    paramsStr.split("&").map(item => {
        let values: string[] = item.split("=");
        obj[values[0]] = values[1];
    })

    return obj;
}

export async function getMockData(url: string, params, callback: Function) {
    /**
     * @desc 检查文件
     *       1.优先匹配js文件
     *       2.js文件不存在时匹配json文件
     * */
    const isJS = await fileCheck(url + JS_EXT);
    if (isJS) {
        const _mockData = require(url + JS_EXT)(params)
        callback(JSON.stringify(_mockData));
    } else {
        const isJSON = await fileCheck(url + JSON_EXT);
        if (isJSON) {
            readPage(url + JSON_EXT, (err, data) => {
                if (data) callback(data.toString());
            }, false)
        } else {
            console.log("未匹配到对应文件！")
        }
    }
}

export function merge(...obj) {
    let _mergeRes = {};

    [...obj].forEach(item => {
        for (let key in item) {
            _mergeRes[key] = item[key];
        }
    });

    return _mergeRes;
}