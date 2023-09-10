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
exports.TestsService = void 0;
const inversify_1 = require("inversify");
const models_1 = require("../db/models");
const entity_1 = require("./entity");
let TestsService = class TestsService {
    createTest(title, description, creator) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTest = new entity_1.Test(title, description, creator);
            const findResult = yield models_1.TestModel.findOne({ name: newTest.title });
            if (findResult) {
                return null;
            }
            const result = yield models_1.TestModel.create({
                title: newTest.title,
                description: newTest.description,
                creator: newTest.creator,
                questions: undefined,
                scores: undefined,
            });
            yield models_1.UserModel.updateOne({ _id: creator }, { $push: { tests: result._id } });
            return new entity_1.Test(result.title, result.description, result.creator, result.questions, result.scores, result._id);
        });
    }
    findAllTests() {
        return __awaiter(this, void 0, void 0, function* () {
            const tests = yield models_1.TestModel.find();
            if (tests.length == 0) {
                return null;
            }
            const result = [];
            tests.map((item) => {
                result.push(new entity_1.Test(item.title, item.description, item.creator, item.questions, item.scores, item._id));
            });
            return result;
        });
    }
    findTests(title, description, creator) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTest = new entity_1.Test(title, description, creator);
            const query = models_1.TestModel.find();
            if (newTest === null || newTest === void 0 ? void 0 : newTest.title) {
                query.where("title").equals(newTest === null || newTest === void 0 ? void 0 : newTest.title);
            }
            if (newTest === null || newTest === void 0 ? void 0 : newTest.description) {
                query.where("description").equals(newTest === null || newTest === void 0 ? void 0 : newTest.description);
            }
            if (newTest === null || newTest === void 0 ? void 0 : newTest.creator) {
                query.where("creator").equals(newTest === null || newTest === void 0 ? void 0 : newTest.creator);
            }
            const result = yield query.exec();
            let tests;
            if (result.length == 0) {
                return null;
            }
            else {
                tests = result.map((item) => {
                    return new entity_1.Test(item.title, item.description, item.creator, item.questions, item.scores, item._id);
                });
                return tests;
            }
        });
    }
    findOneTest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield models_1.TestModel.findOne({ _id: id })
                .populate("creator")
                .exec();
            if (!test) {
                return null;
            }
            return new entity_1.Test(test.title, test.description, test.creator, test.questions, test.scores, test._id);
        });
    }
    updateTest(test_id, newTitle, newDescription, creator) {
        return __awaiter(this, void 0, void 0, function* () {
            const verify = yield models_1.TestModel.findById(test_id);
            if (!verify || verify.creator != creator) {
                return false;
            }
            const query = models_1.TestModel.where();
            query.where("_id").equals(test_id);
            if (newTitle) {
                query.updateOne({ title: newTitle });
            }
            if (newDescription) {
                query.updateOne({ description: newDescription });
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
    deleteTest(creator, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const validRoot = models_1.TestModel.findOne().where("_id").equals(_id);
            const verify = yield validRoot.exec();
            if (!verify || verify.creator != creator) {
                return false;
            }
            const query = models_1.TestModel.where("_id").equals(_id);
            const result = yield query.deleteOne().exec();
            if (result.deletedCount == 0) {
                return false;
            }
            else {
                yield models_1.UserModel.updateOne({ _id: creator }, { $pull: { tests: _id } });
                return true;
            }
        });
    }
    updateScore(score, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield models_1.TestModel.findById(_id);
            if (test === null || test === undefined)
                return false;
            const isUserScoreExisted = test.scores.find((obj) => {
                return obj.userRelation === score.userRelation;
            });
            if (isUserScoreExisted) {
                yield models_1.TestModel.updateOne({ _id }, { $push: { scores: score } });
                return true;
            }
            else {
                yield models_1.TestModel.updateOne({ _id }, { $push: { "scores.$[score].score": score.score } }, { arrayFilters: [{ "score.userRelation": score.userRelation }] });
                return true;
            }
        });
    }
};
exports.TestsService = TestsService;
exports.TestsService = TestsService = __decorate([
    (0, inversify_1.injectable)()
], TestsService);
//# sourceMappingURL=service.js.map