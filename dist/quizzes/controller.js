"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsController = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const base_controller_1 = require("../common/base.controller");
const types_1 = require("../types");
let TestsController = class TestsController extends base_controller_1.BaseContorller {
    constructor(testsService) {
        super();
        this.testsService = testsService;
        this.bindRoutes([
            { path: "/create", method: "post", func: this.create },
            { path: "/create", method: "get", func: this.createData },
            { path: "/find", method: "post", func: this.find },
            { path: "/find", method: "get", func: this.readData },
            { path: "/find/:id", method: "get", func: this.findOne },
            { path: "/update", method: "post", func: this.update },
            { path: "/update", method: "get", func: this.updateData },
            { path: "/delete", method: "post", func: this.delete },
            { path: "/delete", method: "get", func: this.deleteData },
            { path: "/score", method: "post", func: this.addScore },
        ]);
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.title) {
                res.json({
                    eMsg: "Name your test",
                });
                return;
            }
            const createdItem = yield this.testsService.createTest(req.body.title, req.body.description, req.cookies.login);
            if (!createdItem) {
                res.json({
                    eMsg: "Test with same name already exists",
                });
            }
            else {
                res.json({
                    _id: createdItem._id,
                });
            }
        });
    }
    find(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.title) && !((_b = req.body) === null || _b === void 0 ? void 0 : _b.description) && !((_c = req.body) === null || _c === void 0 ? void 0 : _c.creator)) {
                const tests = yield this.testsService.findAllTests();
                res.json({
                    tests,
                });
                return;
            }
            const findedItems = yield this.testsService.findTests(req.body.title, req.body.description, req.cookies.login);
            if (!findedItems) {
                res.json({
                    eMsg: "We found nothing, try again",
                });
            }
            else {
                res.json({
                    title: "Read",
                    result: findedItems,
                });
            }
        });
    }
    findOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const testId = req.params.id;
            const test = yield this.testsService.findOneTest(testId);
            res.json({
                test,
            });
        });
    }
    update(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.newTitle) && !((_b = req.body) === null || _b === void 0 ? void 0 : _b.newDescription)) {
                res.json({
                    eMsg: "What change you want to do?",
                });
                return;
            }
            const updatedItems = yield this.testsService.updateTest(req.body._id, req.body.newTitle, req.body.newDescription, req.cookies.login);
            if (!updatedItems) {
                res.json({
                    eMsg: "Nothing was updated",
                });
            }
            else {
                res.json({
                    msg: "Successfully updated",
                });
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield this.testsService.deleteTest(req.cookies.login, req.body._id);
            if (!isDeleted) {
                res.json({
                    eMsg: "Nothing was deleted",
                });
            }
            else {
                res.json({
                    msg: "Document was successfully deleted",
                });
            }
        });
    }
    addScore(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newScore = {
                userRelation: req.cookies.login,
                score: req.body.score,
            };
            const updatedScore = yield this.testsService.updateScore(newScore, req.body._id);
            if (!updatedScore) {
                res.json({
                    eMsg: "Something went wrong",
                });
            }
            else {
                res.json({
                    msg: "New score was successfully added",
                });
            }
        });
    }
    createData(req, res, next) {
        if (!req.cookies.login) {
            res.redirect(`/?eMsg=You are not authorized`);
        }
        else {
            res.json({ title: "Create" });
        }
    }
    readData(req, res, next) {
        if (!req.cookies.login) {
            res.redirect(`/?eMsg=You are not authorized`);
        }
        else {
            res.json({ title: "Find" });
        }
    }
    updateData(req, res, next) {
        var _a, _b, _c;
        if (!req.cookies.login) {
            res.redirect(`/?eMsg=You are not authorized`);
        }
        else {
            res.json({
                title: "Update",
                name: (_a = req.body) === null || _a === void 0 ? void 0 : _a.name,
                cost: (_b = req.body) === null || _b === void 0 ? void 0 : _b.cost,
                amount: (_c = req.body) === null || _c === void 0 ? void 0 : _c.amount,
            });
        }
    }
    deleteData(req, res, next) {
        if (!req.cookies.login) {
            res.redirect(`/?eMsg=You are not authorized`);
        }
        else {
            res.json({ title: "Delete" });
        }
    }
};
exports.TestsController = TestsController;
exports.TestsController = TestsController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.TestsService)),
    __metadata("design:paramtypes", [Object])
], TestsController);
//# sourceMappingURL=controller.js.map