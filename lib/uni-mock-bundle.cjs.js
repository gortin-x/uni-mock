#!/usr/bin/env node
'use strict';

var path = require('path');
var fs = require('fs');
var http = require('http');
var chalk = require('chalk');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespace(path);
var fs__namespace = /*#__PURE__*/_interopNamespace(fs);
var http__namespace = /*#__PURE__*/_interopNamespace(http);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var JS_EXT = ".js";
var JSON_EXT = ".json";
function readPage(filePath, callback, check) {
    if (filePath === void 0) { filePath = ''; }
    if (check === void 0) { check = true; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (check) {
                fileCheck(filePath).then(function (isExist) {
                    isExist ? fs__namespace.readFile(filePath, function (err, data) {
                        if (err) {
                            console.log(err);
                            callback(err, false);
                        }
                        else {
                            callback(err, data);
                        }
                    }) : '';
                });
            }
            return [2 /*return*/];
        });
    });
}
function fileCheck(file, callback) {
    // 检查当前目录中是否存在该文件。
    return new Promise(function (resolve, reject) {
        fs__namespace.access(file, fs__namespace.constants.F_OK & fs__namespace.constants.R_OK, function (err) {
            if (err) {
                // console.log("file check:"+ file)
                // console.log("file check:" + err)
                resolve(false);
                return false;
            }
            else {
                resolve(true);
                return true;
            }
        });
    });
}
function isMock(url, suffix) {
    return url.indexOf(suffix) > -1;
}
function formatUrl(url) {
    if (url.indexOf('?') < 0)
        return {
            url: url,
            params: null
        };
    var urlToArr = url.split("?");
    var originUrl = urlToArr[0], originParams = urlToArr[1];
    var params = paramsStrToObj(originParams);
    return {
        url: originUrl,
        params: params
    };
}
function paramsStrToObj(paramsStr) {
    var obj = {};
    paramsStr.split("&").map(function (item) {
        var values = item.split("=");
        obj[values[0]] = values[1];
    });
    return obj;
}
function getMockData(url, params, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var isJS, _mockData, isJSON;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fileCheck(url + JS_EXT)];
                case 1:
                    isJS = _a.sent();
                    if (!isJS) return [3 /*break*/, 2];
                    _mockData = require(url + JS_EXT)(params);
                    callback(JSON.stringify(_mockData));
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, fileCheck(url + JSON_EXT)];
                case 3:
                    isJSON = _a.sent();
                    if (isJSON) {
                        readPage(url + JSON_EXT, function (err, data) {
                            if (data)
                                callback(data.toString());
                        }, false);
                    }
                    else {
                        console.log("未匹配到对应文件！");
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function merge() {
    var obj = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        obj[_i] = arguments[_i];
    }
    var _mergeRes = {};
    __spreadArray([], obj, true).forEach(function (item) {
        for (var key in item) {
            _mergeRes[key] = item[key];
        }
    });
    return _mergeRes;
}

function initServer(config) {
    var _this = this;
    var whiteList = config.whiteList || [];
    var server = http__namespace.createServer(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var formatedUrl, _originUrl, _originParams_1, url_1;
        return __generator(this, function (_a) {
            if (whiteList.indexOf(req.headers.host) > -1) {
                res.setHeader('Access-Control-Allow-Origin', "" + req.headers.origin);
            }
            else {
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
            if (req.url.match(/(.jpg|.png|.ico)$/g) || req.url.match(/(.mjs|.js|.map)$/g))
                return [2 /*return*/];
            // mock data
            if (isMock(req.url, config['suffix'])) {
                formatedUrl = formatUrl(req.url);
                _originUrl = formatedUrl["url"];
                _originParams_1 = formatedUrl["params"];
                url_1 = path__namespace.join(config["path"], _originUrl.split(config['suffix'])[1]);
                req.on("data", function (chunk) {
                });
                req.on('end', function () {
                    getMockData(path__namespace.join(process.cwd(), url_1), JSON.stringify(_originParams_1), function (data) {
                        res.write(data);
                        res.end();
                    });
                });
            }
            // 主页
            else if (req.url == "/") {
                res.end("Uni Mock Serve Is Runing...");
            }
            // 错误
            else {
                res.end("OOPS! Uni Mock Serve Has Failed");
            }
            return [2 /*return*/];
        });
    }); });
    server.listen(config.port, config.host, function () {
        console.log(chalk__default["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        {green \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 }\n            {green.bold \uD83D\uDEA2  uni-mock }\n            {green \u672C\u5730\u670D\u52A1\u542F\u52A8\u6210\u529F\uFF01}\n            {green host\uFF1A}{green.bold ", "}\n            {green port\uFF1A}{green.bold ", "}\n        {green \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 }\n        "], ["\n        {green \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 }\n            {green.bold \uD83D\uDEA2  uni-mock }\n            {green \u672C\u5730\u670D\u52A1\u542F\u52A8\u6210\u529F\uFF01}\n            {green host\uFF1A}{green.bold ", "}\n            {green port\uFF1A}{green.bold ", "}\n        {green \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014 }\n        "])), config.host, config.port));
    });
}
var templateObject_1;

var defaultConfig = {
    host: "0.0.0.0",
    port: 80,
    path: "/mock/",
    suffix: "/",
    whiteList: []
};

var configPath = path__namespace.resolve(process.cwd() + '/um.config.js');
fileCheck(configPath).then(function (newConfig) {
    var _defaultConfig = merge(defaultConfig, newConfig ? require(configPath) : {});
    initServer(_defaultConfig);
}).catch(function (err) {
    console.log(err);
});
