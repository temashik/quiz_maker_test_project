"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
class Question {
    constructor(_description, _answers, _correctAnswers, _testRelation, __id) {
        this._description = _description;
        this._answers = _answers;
        this._correctAnswers = _correctAnswers;
        this._testRelation = _testRelation;
        this.__id = __id;
    }
    get description() {
        return this._description;
    }
    get answers() {
        return this._answers;
    }
    get correctAnswers() {
        return this._correctAnswers;
    }
    get testRelation() {
        return this._testRelation;
    }
    get _id() {
        return this.__id;
    }
}
exports.Question = Question;
//# sourceMappingURL=entity.js.map