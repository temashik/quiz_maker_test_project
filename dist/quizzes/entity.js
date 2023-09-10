"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
class Test {
    constructor(_title, _description, _creator, _questions, _scores, __id) {
        this._title = _title;
        this._description = _description;
        this._creator = _creator;
        this._questions = _questions;
        this._scores = _scores;
        this.__id = __id;
    }
    get title() {
        return this._title;
    }
    get description() {
        return this._description;
    }
    get creator() {
        return this._creator;
    }
    get questions() {
        return this._questions;
    }
    get scores() {
        return this._scores;
    }
    get _id() {
        return this.__id;
    }
}
exports.Test = Test;
//# sourceMappingURL=entity.js.map