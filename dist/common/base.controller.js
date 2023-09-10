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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContorller = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
require("reflect-metadata");
let BaseContorller = class BaseContorller {
    constructor() {
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    bindRoutes(routes) {
        for (const route of routes) {
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }
};
exports.BaseContorller = BaseContorller;
exports.BaseContorller = BaseContorller = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], BaseContorller);
//# sourceMappingURL=base.controller.js.map