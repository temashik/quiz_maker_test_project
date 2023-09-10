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
Object.defineProperty(exports, "__esModule", { value: true });
exports.boot = exports.appBindings = void 0;
const inversify_1 = require("inversify");
const app_1 = require("./app");
const controller_1 = require("./questions/controller");
const service_1 = require("./questions/service");
const controller_2 = require("./quizzes/controller");
const service_2 = require("./quizzes/service");
const types_1 = require("./types");
const controller_3 = require("./users/controller");
const service_3 = require("./users/service");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.Application).to(app_1.App);
    bind(types_1.TYPES.TestsController)
        .to(controller_2.TestsController)
        .inSingletonScope();
    bind(types_1.TYPES.UsersController)
        .to(controller_3.UsersController)
        .inSingletonScope();
    bind(types_1.TYPES.QuestionsController)
        .to(controller_1.QuestionsController)
        .inSingletonScope();
    bind(types_1.TYPES.UsersService).to(service_3.UsersService).inSingletonScope();
    bind(types_1.TYPES.TestsService).to(service_2.TestsService).inSingletonScope();
    bind(types_1.TYPES.QuestionsService)
        .to(service_1.QuestionsService)
        .inSingletonScope();
});
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const appContainer = new inversify_1.Container();
        appContainer.load(exports.appBindings);
        const app = appContainer.get(types_1.TYPES.Application);
        yield app.init();
        return { app, appContainer };
    });
}
exports.boot = bootstrap();
//# sourceMappingURL=main.js.map