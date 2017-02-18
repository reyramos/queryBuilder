/**
 * Created by ramor11 on 2/17/2017.
 */


import * as angular from "angular";
import {QUERY_INTERFACE} from "../component/query.interface";

const JSON_DATASET: any = require('./operands');
const PrettyJSON: any = require('./pretty-json');

require('pretty-json/css/pretty-json.css');

class DemoComponentCtrl implements ng.IComponentController {

    static $inject = ['$element'];

    public filters: any;
    public fields: any;
    public output: string;
    private JSON_PRETTY;

    constructor(private $element) {
        this.JSON_PRETTY = $element.find('#PRETTY_JSON');
    }

    $onInit() {
        this.filters = angular.copy(QUERY_INTERFACE);
        // this.filters = {
        // 	"type": "group",
        // 	"op": "AND",
        // 	"expressions": [{
        // 		"type": "condition",
        // 		"field": {
        // 			"description": "Account Country",
        // 			"name": "DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.ACCOUNT_COUNTRY",
        // 			"dataType": "STRING",
        // 			"type": "DIMENSION"
        // 		},
        // 		"operator": "EQ",
        // 		"values": ["United States"]
        // 	}, {
        // 		"type": "group",
        // 		"op": "OR",
        // 		"expressions": [{
        // 			"type": "group",
        // 			"op": "AND",
        // 			"expressions": [{
        // 				"type": "condition",
        // 				"field": {
        // 					"description": "Patient Gender",
        // 					"name": "DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_GENDER",
        // 					"dataType": "STRING",
        // 					"type": "DIMENSION"
        // 				},
        // 				"operator": "LT",
        // 				"values": ["M"]
        // 			}, {
        // 				"type": "condition",
        // 				"operator": "EQ",
        // 				"field": {
        // 					"description": "Patient Age",
        // 					"name": "DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_AGE",
        // 					"dataType": "STRING",
        // 					"type": "DIMENSION"
        // 				},
        // 				"values": []
        // 			}],
        // 		}, {
        // 			"type": "group",
        // 			"op": "AND",
        // 			"expressions": [{
        // 				"type": "condition",
        // 				"field": {
        // 					"description": "Patient Gender",
        // 					"name": "DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_GENDER",
        // 					"dataType": "STRING",
        // 					"type": "DIMENSION"
        // 				},
        // 				"operator": "EQ",
        // 				"values": ["F"]
        // 			}]
        // 		}]
        // 	}]
        // };


        var mapping = function (d) {
            var handler = {
                description: d.description,
                value: d.name
            };
            return handler;
        };

        this.fields = angular.copy(JSON_DATASET.dimension.map(mapping));
    }


    /**
     * Update the view with the new output
     * @param e
     */
    onChanges(e) {
        let self: any = this;
        if (!angular.equals(this.output, e.string)) {
            self.output = e.string;
        }

        var node = new PrettyJSON.view.Node({
            el: self.JSON_PRETTY,
            data: e.group
        });
    };


}

export class DemoComponent implements ng.IComponentOptions {
    public template: any;
    public controller: any;


    constructor() {
        this.template = require('./index.sample.html');
        this.controller = DemoComponentCtrl;
    }
}
