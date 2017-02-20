/**
 * Created by ramor11 on 2/17/2017.
 */


import * as angular from "angular";
import {QUERY_INTERFACE} from "../component/query.interface";
declare let Bloodhound: any;


const PrettyJSON: any = require('./pretty-json');
const JSON_DATASET: any = require('./api/operands');


require('pretty-json/css/pretty-json.css');
require('./typeaheadjs.less');

class DemoComponentCtrl implements ng.IComponentController {

    static $inject = ['$scope', '$element'];

    public filters: any;
    public fields: any;
    public output: string;
    private JSON_PRETTY;

    constructor(private $scope, private $element) {
        this.JSON_PRETTY = $element.find('#PRETTY_JSON');

    }

    $onInit() {
        this.filters = angular.copy(QUERY_INTERFACE);

        var mapping = function (d) {
            var handler = {
                description: d.description,
                name       : d.name,
                type       : d.dataType,
            };
            return handler;
        };

        this.fields = angular.copy(JSON_DATASET.map(mapping));

    }

    private setBloodhound(ele) {
        let states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
            'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
            'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
            'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
            'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
            'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
            'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
            'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
            'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ];

        return new Promise((resolve, reject) => {
            if (!ele.data('bloodhound')) {
                let typed = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.whitespace,
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    local         : states
                });

                ele.data('bloodhound', typed);
                ($ as any)(ele)
                    .typeahead({
                            minLength: 3,
                            hint     : true,
                            highlight: true
                        },
                        {
                            name  : 'states',
                            source: typed
                        });


            }

            ($ as any)(ele).off('typeahead:select').on('typeahead:select', function (ev, suggestion) {
                resolve(suggestion)
            });
        })
    }


    onValueFetch(e) {
        if (["SOME_TABLE_NAME_STATE"].indexOf(e.group.field.name) !== -1) {
            let self: any = this;
            let ele: any = angular.element(e.$event.target)
            let ctrl = ele.controller('ngModel');
            this.setBloodhound(ele).then((result) => {
                ctrl.$setViewValue(result, 'change')
            });
        }
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
            el  : self.JSON_PRETTY,
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
