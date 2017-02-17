/**
 * Created by ramor11 on 12/8/2016.
 */
"use strict";
exports.QUERY_INTERFACE = Object.freeze({
    "type": "group",
    "op": "AND",
    "expressions": [
        {
            "type": "condition",
            "field": {
                "name": "",
                "description": ""
            },
            "operator": "EQ",
            "values": [] // For LT, LE, GT, GE, EQ, NE, CONTAINS -> Single value; For IN -> One or more values; For BETWEEN -> Two values
        }
    ]
});
//# sourceMappingURL=query.interface.js.map