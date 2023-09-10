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
exports.QuestionsController = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const base_controller_1 = require("../common/base.controller");
const types_1 = require("../types");
let QuestionsController = class QuestionsController extends base_controller_1.BaseContorller {
    constructor(questionService) {
        super();
        this.questionService = questionService;
        this.bindRoutes([
            { path: "/create", method: "post", func: this.create },
            { path: "/create", method: "get", func: this.createData },
            { path: "/find", method: "post", func: this.find },
            { path: "/find", method: "get", func: this.readData },
            { path: "/update", method: "post", func: this.update },
            { path: "/update", method: "get", func: this.updateData },
            { path: "/delete", method: "post", func: this.delete },
            { path: "/delete", method: "get", func: this.deleteData },
        ]);
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.description) {
                res.json({
                    eMsg: "Describe your question",
                });
                return;
            }
            if (req.body.answers.length < 2) {
                res.json({
                    eMsg: "Create at least 2 answers",
                });
                return;
            }
            if (req.body.correctAnswers.length == 0) {
                res.json({
                    eMsg: "There are no correct answers on your question",
                });
                return;
            }
            const createdQuestion = yield this.questionService.createQuestion(req.body.description, req.body.answers, req.body.correctAnswers, req.body.testRelation);
            if (!createdQuestion) {
                res.json({
                    eMsg: "Question with same description already exists",
                });
            }
            else {
                res.json({
                    _id: createdQuestion._id,
                });
            }
        });
    }
    find(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const questions = yield this.questionService.findQuestions(req.body.testRelation);
            res.json({
                questions,
            });
            return;
        });
    }
    update(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.newDescription) &&
                !((_b = req.body) === null || _b === void 0 ? void 0 : _b.newAnswers) &&
                !((_c = req.body) === null || _c === void 0 ? void 0 : _c.newCorrectAnswers)) {
                res.json({
                    eMsg: "What change you want to do?",
                });
                return;
            }
            const updatedQuestion = yield this.questionService.updateQuestion(req.body.question_id, req.body.newDescription, req.body.newAnswers, req.body.newCorrectAnswers, req.body.testRelation);
            if (!updatedQuestion) {
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
            const isDeleted = yield this.questionService.deleteQuestion(req.body.testRelation, req.body._id);
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
exports.QuestionsController = QuestionsController;
exports.QuestionsController = QuestionsController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.QuestionsService)),
    __metadata("design:paramtypes", [Object])
], QuestionsController);
//# sourceMappingURL=controller.js.map