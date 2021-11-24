# uni-mock

![APM](https://img.shields.io/badge/license-MIT-green)

[![NPM](https://nodei.co/npm/uni-mock.png)](https://nodei.co/npm/uni-mock/)

> data mock service for developer

## Installation
```js
npm install uni-mock -save-dev
```

## Run
```js
uni-mock
```

## Config
touch a config file named um.config.js to set your own mock service
- path Set the listening directory according to the project
- suffix Set the service server path suffix
- host Set the service server host
- port Set the service server port

## Example
um.config.js
```javascript
module.exports = {
    path: "/mock",
    suffix: "_MOCK_",
    host: "localhost",
    port: 8080
}
```

mock.json
```json
{
    "reponseCode": "0000",
    "reponseData": {
        "name": "Tom"
    }
}
```

mock.js
```javascript
module.exports = function (params){
    if(params.name === 'Tom'){
        return{
            "reponseCode": "0000",
            "reponseData": {
                "name": "Tom"
            } 
        }
    }else{
        return{
            "reponseCode": "9999",
            "reponseData": "invalid user name!"
        }
    }
    
}
```
