"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const inversify_1 = require("inversify");
const entity_1 = require("./entity");
const models_1 = require("../db/models");
require("dotenv/config");
let UsersService = class UsersService {
    createUser(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new entity_1.User(name);
            const salt = Number(process.env.SALT) || 6;
            yield newUser.setPassword(password, salt);
            const findResult = yield models_1.UserModel.findOne({ name: newUser.name });
            if (findResult) {
                return false;
            }
            yield models_1.UserModel.create({
                name: newUser.name,
                password: newUser.password,
                tests: [],
            });
            return true;
        });
    }
    validateUser(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedUser = yield models_1.UserModel.findOne({ name: name });
            if (!existedUser) {
                return null;
            }
            const newUser = new entity_1.User(existedUser.name, existedUser.password, existedUser._id, existedUser.tests);
            if (yield newUser.comparePassword(password)) {
                return newUser;
            }
            else {
                return null;
            }
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, inversify_1.injectable)()
], UsersService);
//# sourceMappingURL=service.js.map