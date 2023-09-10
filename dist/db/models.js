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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModel = exports.QuestionModel = exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    tests: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Test" }],
});
const QuestionSchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    answers: [
        {
            number: Number,
            text: String,
        },
    ],
    correctAnswers: [Number],
    testRelation: { type: mongoose_1.Schema.Types.ObjectId, ref: "Test" },
});
const TestSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    questions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Question" }],
    scores: [
        {
            userRelation: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            score: [Number],
        },
    ],
});
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.UserModel = UserModel;
const QuestionModel = mongoose_1.default.model("Question", QuestionSchema);
exports.QuestionModel = QuestionModel;
const TestModel = mongoose_1.default.model("Test", TestSchema);
exports.TestModel = TestModel;
//# sourceMappingURL=models.js.map