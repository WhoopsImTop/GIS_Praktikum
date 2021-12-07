"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
exports.__esModule = true;
var http = require("http");
var hostname = "127.0.0.1"; // localhost
var port = 3000;
var server = http.createServer(function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var url, _a, param, res;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
                url = new URL(request.url || "", "http://" + request.headers.host);
                _a = url.pathname;
                switch (_a) {
                    case "/": return [3 /*break*/, 1];
                    case "/convertDate": return [3 /*break*/, 2];
                }
                return [3 /*break*/, 4];
            case 1:
                response.end("Server erreichbar");
                return [3 /*break*/, 5];
            case 2:
                param = url.searchParams.get("date");
                return [4 /*yield*/, convertDate(param)];
            case 3:
                res = _b.sent();
                response.end(JSON.stringify(res));
                _b.label = 4;
            case 4:
                response.statusCode = 404;
                _b.label = 5;
            case 5:
                response.end();
                return [2 /*return*/];
        }
    });
}); });
server.listen(port, hostname, function () {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});
function convertDate(date) {
    return __awaiter(this, void 0, void 0, function () {
        var newDate, convertedDate, Months, Response;
        return __generator(this, function (_a) {
            if (date.includes(".")) {
                convertedDate = date.split(".");
                newDate = new Date(convertedDate[2] + "." + convertedDate[1] + "." + convertedDate[0]);
            }
            else {
                newDate = new Date(date);
            }
            Months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
            Response = {
                "Day": newDate.getDate(),
                "Month": Months[newDate.getMonth()],
                "Year": newDate.getFullYear(),
                "DateString": "Day: " + newDate.getDate() + " Month: " + Months[newDate.getMonth()] + " Year: " + newDate.getFullYear()
            };
            return [2 /*return*/, Response];
        });
    });
}
