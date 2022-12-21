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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.checkSession = exports.removeAllSessions = exports.dropAuthenticatorKey = exports.getAuthenticatorKey = exports.storeSession = void 0;
var mongodb_1 = require("@/lib/mongodb");
var storeSession = function (sessionid, expiry) { return __awaiter(void 0, void 0, void 0, function () {
    var client, db, collection, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongodb_1["default"]];
            case 1:
                client = _a.sent();
                db = client.db("Playground");
                collection = db.collection("sessions");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, collection.insertOne({ sessionid: sessionid, expiry: expiry })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                throw new Error(e_1);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.storeSession = storeSession;
var getAuthenticatorKey = function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, db, collection, secret, key, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongodb_1["default"]];
            case 1:
                client = _a.sent();
                db = client.db("Playground");
                collection = db.collection("authenticator");
                secret = process.env.AUTHENTICATOR_SECRET;
                return [4 /*yield*/, collection.find({}).toArray()];
            case 2:
                key = _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 7, , 8]);
                if (!(key.length === 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, collection.insertOne({ key: secret }).then(function (key) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, collection.find({}).toArray()];
                                case 1:
                                    key = _a.sent();
                                    return [2 /*return*/, key[0]["key"]];
                            }
                        });
                    }); })];
            case 4:
                key = _a.sent();
                return [3 /*break*/, 6];
            case 5:
                key = key[0]["key"];
                _a.label = 6;
            case 6: return [2 /*return*/, key];
            case 7:
                e_2 = _a.sent();
                throw new Error(e_2);
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getAuthenticatorKey = getAuthenticatorKey;
var dropAuthenticatorKey = function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, db, collection, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongodb_1["default"]];
            case 1:
                client = _a.sent();
                db = client.db("Playground");
                collection = db.collection("authenticator");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, collection.drop()];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                e_3 = _a.sent();
                throw new Error(e_3);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.dropAuthenticatorKey = dropAuthenticatorKey;
var removeAllSessions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, db, collection, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongodb_1["default"]];
            case 1:
                client = _a.sent();
                db = client.db("Playground");
                collection = db.collection("sessions");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, collection.remove()];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                e_4 = _a.sent();
                throw new Error(e_4);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeAllSessions = removeAllSessions;
var checkSession = function (sessionid) { return __awaiter(void 0, void 0, void 0, function () {
    var client, db, collection, documents, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongodb_1["default"]];
            case 1:
                client = _a.sent();
                db = client.db("Playground");
                collection = db.collection("sessions");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, collection
                        .find({
                        sessionid: sessionid
                    })
                        .toArray()];
            case 3:
                documents = _a.sent();
                if (documents.length === 0)
                    return [2 /*return*/, false];
                return [2 /*return*/, true];
            case 4:
                e_5 = _a.sent();
                throw new Error(e_5);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.checkSession = checkSession;