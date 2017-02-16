/**
 * Created by ramor11 on 3/1/2016.
 */

//the object data for the OPERANDS
var JSON_DATASET = require('./operands');

module.exports = function (app) {

	app.controller('QueryBuilderController', FilterController);

	FilterController.$inject = ['QUERY_INTERFACE'];

	function FilterController(QUERY_INTERFACE) {

		console.clear();
		// this.filters = angular.copy(QUERY_INTERFACE.filters);
		this.filters = {
			"type": "group",
			"op": "AND",
			"expressions": [{
				"type": "condition",
				"field": {
					"description": "Account Country",
					"name": "DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.ACCOUNT_COUNTRY",
					"dataType": "STRING",
					"type": "DIMENSION"
				},
				"operator": "EQ",
				"values": ["United States"]
			}, {
				"type": "group",
				"op": "OR",
				"expressions": [{
					"type": "group",
					"op": "AND",
					"expressions": [{
						"type": "condition",
						"field": {
							"description": "Patient Gender",
							"name": "DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_GENDER",
							"dataType": "STRING",
							"type": "DIMENSION"
						},
						"operator": "LT",
						"values": ["M"]
					}, {
						"type": "condition",
						"operator": "EQ",
						"field": {
							"description": "Patient Age",
							"name": "DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_AGE",
							"dataType": "STRING",
							"type": "DIMENSION"
						},
						"values": []
					}],
				}, {
					"type": "group",
					"op": "AND",
					"expressions": [{
						"type": "condition",
						"field": {
							"description": "Patient Gender",
							"name": "DB_PHX_ORDERS_TZ.ORDER_FLAT_2016_DEC_15_TO_31_TABLE.PATIENT_GENDER",
							"dataType": "STRING",
							"type": "DIMENSION"
						},
						"operator": "EQ",
						"values": ["F"]
					}]
				}]
			}]
		};

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
		};


		function cleanObject(filter) {
			var remove = [];
			filter.expressions.forEach(function (arr, i) {
				!function () {
					if (arr.type === 'condition') {
						if (arr.values && !arr.values.length)remove.push(i)
					} else {
						var narr = cleanObject(arr);
						filter.expressions[i] = narr;
					}
				}(i)
			});


			remove.forEach(function (index) {
				filter.expressions.splice(index, 1);
			});

			return filter

		}


		this.CleanObject = function () {
			// cleanObject(this.filters)

			var regex = /\{"type":"condition".*?"values":\[\]\}/g;
			var str = angular.toJson(this.filters);
			var m;

			while ((m = regex.exec(str)) !== null) {
				if (m.index === regex.lastIndex) {
					regex.lastIndex++;
				}
				m.forEach(function (match) {
					var obj = JSON.parse("[" + match + "]");
					obj.forEach(function (o) {
						if (!o.values.length) {
							var search = JSON.stringify(o).trim();
							var re = str.split(search);
							str = re.join("");
						}
					})
				});
			}
			//clean up the json
			str = str.replace(/,\]/g, "]").replace(/\[,/g, "[").replace(/,,/g, ",");
			console.log(JSON.parse(str))
		}


	}

};
