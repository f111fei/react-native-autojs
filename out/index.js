"use strict";
exports.__esModule = true;
var react_native_1 = require("react-native");
var RNAutojsModule = react_native_1.NativeModules.RNAutojsModule;
var Autojs = /** @class */ (function () {
    function Autojs() {
    }
    Autojs.run = function (script) {
        return RNAutojsModule.run();
    };
    return Autojs;
}());
exports.Autojs = Autojs;
//# sourceMappingURL=index.js.map