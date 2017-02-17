/**
 * Created by reyra on 7/12/2016.
 */
"use strict";
var angular = require("angular");
var query_builder_component_1 = require("./component/query-builder.component");
var tags_component_1 = require("./tags/tags.component");
var query_conditions_1 = require("./component/query.conditions");
var query_interface_1 = require("./component/query.interface");
var app = angular.module("app.queryBuilder", []);
app.constant('QUERY_OPERATORS', query_conditions_1.QUERY_OPERATORS);
app.constant('QUERY_CONDITIONS', query_conditions_1.QUERY_CONDITIONS);
app.constant('QUERY_INTERFACE', query_interface_1.QUERY_INTERFACE);
app.component('queryBuilder', new query_builder_component_1.QueryBuilder());
app.component('qbTags', new tags_component_1.TagsComponent());
module.exports = app;
//# sourceMappingURL=index.js.map