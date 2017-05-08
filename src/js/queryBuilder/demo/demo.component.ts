/**
 * Created by ramor11 on 2/17/2017.
 */


import * as angular from "angular";
import {QUERY_INTERFACE} from "../component/query.interface";
import {QueryBuilderService} from "../component/query-builder.service";
declare let Bloodhound: any;


const PrettyJSON: any = require('./pretty-json');
const JSON_DATASET: any = require('./api/operands');
const GROUP_SAMPLE: any = JSON.parse(require('!!raw-loader!./api/json-sample.json'));


require('pretty-json/css/pretty-json.css');
require('./typeaheadjs.less');
require('./custom.less');

class DemoComponentCtrl implements ng.IComponentController {
    
    static $inject = ['$scope', '$element'];
    
    public filters: any;
    public fields: any;
    public output: string;
    private JSON_PRETTY;
    
    private states: Array<string> = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
        'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
        'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
        'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
        'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'Some really long name for this input'
    ];
    
    constructor(private $scope, private $element) {
        this.JSON_PRETTY = $element.find('#PRETTY_JSON');
        
    }
    
    $onInit() {
        
        // must first define the params
        // let queryService = new QueryBuilderService();
        // queryService.fieldName = "description";
        // queryService.fieldDatatype = "dataType";
        // console.log(queryService.stringify(GROUP_SAMPLE));
        
        this.filters = angular.copy(QUERY_INTERFACE);
        this.fields = angular.copy(JSON_DATASET);
    }
    
    private setBloodhound(ele) {
        let self: any = this;
        
        return new Promise((resolve, reject) => {
            if (!ele.data('bloodhound')) {
                let typed = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.whitespace,
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    local         : self.states
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
        
        
        
        /**
         * Control GROUPS
         */
            // if (e.group && ["SOME_TABLE_NAME_STATE"].indexOf(e.group.field.name) !== -1) {
        let self: any = this;
        let ele: any = angular.element(e.$event.target)
        let ctrl = ele.controller('ngModel');
        let model = Array.isArray(ctrl.$viewValue) ? ctrl.$viewValue.slice(0) : ctrl.$viewValue;
        
        this.setBloodhound(ele).then((result) => {
            console.log('typeahead:select', e, result)
            
            if (!!e.group) {
                ctrl.$setViewValue(result, 'change')
            }
        });
        // }
    }
    
    
    validateQuery(group) {
        var validate = [];
        delete group.error;
        
        group.expressions.forEach((o, i) => {
            if (o.type === 'condition') {
                if (['INTEGER', 'STRING'].indexOf(o.field.dataType) !== -1) validate.push(o.field.dataType)
            } else {
                this.validateQuery(o)
            }
        });
        
        if (validate.indexOf('INTEGER') !== -1 && validate.indexOf('STRING') !== -1) {
            group.error = true
        }
        
        return group;
        
    }
    
    /**
     * Update the view with the new output
     * @param e
     */
    onChanges(e) {
        this.validateQuery(e.group);
        // setTimeout(() => {
        //     // this.filters = e.group
        //     this.$scope.$digest();
        // }, 0);
        
        // console.log(JSON.stringify(e.group))
    
        // console.log('onChanges', e.group)
    
        let self: any = this;
        if (!angular.equals(this.output, e.string)) {
            self.output = e.string;
        }
        
        var node = new PrettyJSON.view.Node({
            el  : self.JSON_PRETTY,
            data: e.group
        });
        
        node.expandAll()
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
