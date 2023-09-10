"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importStar(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("./types");
const controller_1 = require("./users/controller");
const controller_2 = require("./quizzes/controller");
const connect_1 = __importDefault(require("./db/connect"));
require("dotenv/config");
const controller_3 = require("./questions/controller");
let App = class App {
    constructor(testsController, usersController, questionsController) {
        this.testsController = testsController;
        this.usersController = usersController;
        this.questionsController = questionsController;
        this.app = (0, express_1.default)();
        this.port = +(process.env.PORT || 8000);
    }
    useRoutes() {
        this.app.use("/", this.testsController.router);
        this.app.use("/", this.usersController.router);
        this.app.use("/find/:id", this.questionsController.router);
    }
    useMiddleware() {
        this.app.use((0, express_1.json)());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, express_1.urlencoded)({ extended: false }));
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = process.env.DB_URI || "mongodb://localhost:27017";
            (0, connect_1.default)({ db });
            this.useMiddleware();
            this.useRoutes();
            this.server = this.app.listen(this.port);
        });
    }
};
exports.App = App;
exports.App = App = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.TestsController)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UsersController)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.QuestionsController)),
    __metadata("design:paramtypes", [controller_2.TestsController,
        controller_1.UsersController,
        controller_3.QuestionsController])
], App);
//# sourceMappingURL=app.js.map