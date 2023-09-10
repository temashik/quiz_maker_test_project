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
exports.QuestionsService = void 0;
const inversify_1 = require("inversify");
const models_1 = require("../db/models");
const entity_1 = require("./entity");
let QuestionsService = class QuestionsService {
    createQuestion(description, answers, correctAnswers, testRelation) {
        return __awaiter(this, void 0, void 0, function* () {
            const findResult = yield models_1.QuestionModel.findOne({
                description,
                testRelation,
            });
            if (findResult) {
                return null;
            }
            const result = yield models_1.QuestionModel.create({
                description,
                answers,
                correctAnswers,
                testRelation,
            });
            yield models_1.TestModel.updateOne({ _id: testRelation }, { $push: { questions: result._id } });
            return new entity_1.Question(result.description, result.answers, result.correctAnswers, result.testRelation, result._id);
        });
    }
    findQuestions(testRelation) {
        return __awaiter(this, void 0, void 0, function* () {
            const questions = yield models_1.QuestionModel.find({ testRelation });
            if (questions.length == 0) {
                return null;
            }
            const result = [];
            questions.map((item) => {
                result.push(new entity_1.Question(item.description, item.answers, item.correctAnswers, item.testRelation, item._id));
            });
            return result;
        });
    }
    updateQuestion(question_id, newDescription, newAnswers, newCorrectAnswers, testRelation) {
        return __awaiter(this, void 0, void 0, function* () {
            const newValue = new entity_1.Question(newDescription, newAnswers, newCorrectAnswers);
            const query = models_1.QuestionModel.where();
            query.where("_id").equals(question_id);
            query.where("testRelation").equals(testRelation);
            if (newValue === null || newValue === void 0 ? void 0 : newValue.description) {
                query.updateOne({ description: newValue === null || newValue === void 0 ? void 0 : newValue.description });
            }
            if (newValue === null || newValue === void 0 ? void 0 : newValue.answers) {
                query.updateOne({ answers: newValue === null || newValue === void 0 ? void 0 : newValue.answers });
            }
            if (newValue === null || newValue === void 0 ? void 0 : newValue.correctAnswers) {
                query.updateOne({ correctAnswers: newValue === null || newValue === void 0 ? void 0 : newValue.correctAnswers });
            }
            const result = yield query.exec();
            if (result.modifiedCount == 0) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    deleteQuestion(testRelation, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const verify = yield models_1.QuestionModel.findOne({ testRelation, _id });
            if (!verify) {
                return false;
            }
            const result = yield models_1.QuestionModel.deleteOne({ _id });
            if (result.deletedCount == 0) {
                return false;
            }
            else {
                yield models_1.TestModel.updateOne({ _id: testRelation }, { $pull: { questions: _id } });
                return true;
            }
        });
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, inversify_1.injectable)()
], QuestionsService);
//# sourceMappingURL=service.js.map