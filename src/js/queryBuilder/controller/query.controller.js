/**
 * Created by ramor11 on 3/1/2016.
 */

//the object data for the OPERANDS
var JSON_DATASET = require('./operands');
var PrettyJSON = require('../../vendor/pretty-json');
require('pretty-json/css/pretty-json.css');


module.exports = function (app) {

	app.controller('QueryBuilderController', FilterController);

	FilterController.$inject = ['QUERY_INTERFACE', '$element'];

	function FilterController(QUERY_INTERFACE, $element) {
		var JSON_PRETTY = $element.find('#PRETTY_JSON');

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
				name: d.name
			};
			return handler;
		};

		this.fields = angular.copy(JSON_DATASET.dimension.map(mapping));


		/**
		 * Update the view with the new output
		 * @param e
		 */
		this.onChanges = function (e) {
			if (!angular.equals(this.output, e.string)) {
				this.output = e.string;
			}


			var node = new PrettyJSON.view.Node({
				el:JSON_PRETTY,
				data:e.group
			});
		};


	}

};
