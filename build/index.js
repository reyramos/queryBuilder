"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require("angular");
var query_builder_component_1 = require("./component/query-builder.component");
var tags_component_1 = require("./tags/tags.component");
var query_conditions_1 = require("./component/query.conditions");
var query_interface_1 = require("./component/query.interface");
exports.app = angular.module("app.queryBuilder", []);
exports.app.constant('QUERY_OPERATORS', query_conditions_1.QUERY_OPERATORS);
exports.app.constant('QUERY_CONDITIONS', query_conditions_1.QUERY_CONDITIONS);
exports.app.constant('QUERY_INTERFACE', query_interface_1.QUERY_INTERFACE);
exports.app.component('queryBuilder', new query_builder_component_1.QueryBuilder());
exports.app.component('qbTags', new tags_component_1.TagsComponent());
module.exports = exports.app;
//# sourceMappingURL=index.js.map