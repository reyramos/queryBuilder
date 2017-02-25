/**
 * Created by reyra on 2/24/2017.
 */
import * as angular from "angular";
import {QUERY_INTERFACE} from "./query.interface";
/*
 <query-builder
 class="query-builder"
 group="$ctrl.filters"
 operands="$ctrl.fields"
 on-update="$ctrl.onChanges($event)"
 query-string="$ctrl.output"
 field-value="name"
 field-name="description"
 field-datatype="dataType"
 on-value-change="$ctrl.onValueFetch($event)"
 optgroup></query-builder>
 */

let JSON_DATASET = require('../demo/api/operands');

describe('component: queryBuilder', () => {
    let $componentController;
    let $output;
    let group = {
        "type"       : "group",
        "op"         : "AND",
        "expressions": [
            {
                "type"    : "condition",
                "field"   : {
                    "name"       : "SOME_TABLE_NAME_COUNTRY",
                    "description": "Country",
                    "dataType"   : "STRING"
                },
                "operator": "EQ",
                "values"  : [
                    "USA"
                ]
            },
            {
                "type"    : "condition",
                "field"   : {
                    "name"       : "SOME_TABLE_NAME_COUNTRY",
                    "description": "Country",
                    "dataType"   : "STRING"
                },
                "operator": "EQ",
                "values"  : [
                    "Canada"
                ]
            }
        ]
    };
    let scope = {},
        element = angular.element('<div></div>'); //provide element you want to test

    // load the service's module
    beforeEach(angular.mock.module(require('../index').name));
    beforeEach(inject((_$componentController_) => {
        $componentController = _$componentController_;
    }));


    it('should expose a `group` object', function () {
        // Here we are passing actual bindings to the component
        let bindings = {group: group};
        let ctrl = $componentController('queryBuilder', {$element: element, $scope: scope}, bindings);
        expect(ctrl.group.expressions.length).toBe(2);

    });

    it('should call the `onUpdate` binding, when updating a property', function () {
        let onUpdateSpy = jasmine.createSpy('onUpdate');
        let bindings = {group: QUERY_INTERFACE, onUpdate: onUpdateSpy};
        let ctrl = $componentController('queryBuilder', {$element: element, $scope: scope}, bindings);

        ctrl.trigger('onUpdate');
        expect(onUpdateSpy).toHaveBeenCalledWith({
            $event: {
                group : {
                    expressions: [],
                    op         : "AND",
                    type       : "group"
                },
                string: ""
            }
        });
    });

    it('should call the `output` binding', function () {
        let onUpdateSpy = jasmine.createSpy('onUpdate');
        let bindings = {
            group      : angular.copy(group),
            fields     : JSON_DATASET,
            queryString: $output,
            fieldValue : "name",
            fieldName  : "description",
            onUpdate   : onUpdateSpy
        };
        let ctrl = $componentController('queryBuilder', {$element: element, $scope: scope}, bindings);

        ctrl.onGroupChange();
        expect(onUpdateSpy).toHaveBeenCalledWith({
            $event: {
                group : group,
                string: "Country equal `USA` AND Country equal `Canada`"
            }
        });
    });

});
