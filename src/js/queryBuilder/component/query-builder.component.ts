import * as angular from "angular";
import {QUERY_OPERATORS, QUERY_CONDITIONS} from "./query.conditions";
import {QUERY_INTERFACE} from "./query.interface";
import {QueryBuilderService} from "./query-builder.service";

/**
 * Created by ramor11 on 2/2/2017.
 */

declare let window: any;
declare let $: any;
declare let Array: any;
declare let String: any;


const QBKEY: string = "$$QueryBuilder";

// let moment = require('moment');

String.prototype.replaceAt = function (index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
};

Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) {
                a.splice(j--, 1);
            }
        }
    }
    return a;
};

class QueryBuilderCtrl extends QueryBuilderService implements ng.IComponentController {
    
    
    static $inject: Array<string> = ['$element', '$scope'];
    
    
    public maxChips = 1;
    public multi = false;
    
    public operators = QUERY_OPERATORS;
    public conditions: Array<any> = [];
    public group: any;
    public fields: any;
    public fieldDatatype: string;
    public queryString: string;
    public fieldValue: string;
    public fieldName: string;
    
    //output
    private onDelete: any;
    private onUpdate: any;
    private onFetch: any;
    private evals: Array<string> = ["(", ")"];
    
    //trackers
    private $event: any = "";
    private $queryString: string = "";
    private $trigger: boolean = false;
    private $countCondition: number;
    private $timeoutPromise: any;
    //keep original group
    private $group: any;
    private $digestCycle: any;
    private operands: Array<any> = [];
    
    
    constructor(private $element, private $scope: any) {
        super();
        
        Object.keys(QUERY_CONDITIONS).forEach((k) => {
            this.conditions.push(QUERY_CONDITIONS[k])
        });
        
        /*
         Get all available conditions
         */
        this.conditions.map((c) => {
            let lowerCase = (Array.isArray(c.symbol) ? c.symbol : [c.symbol]).map((o) => {
                return o.toLowerCase();
            });
            this.evals = this.evals.concat(lowerCase);
        });
        
        let operators = [];
        /*
         Build the needed operators from the CONST
         */
        
        this.operators.map((c) => {
            let lowerCase = (Array.isArray(c.name) ? c.name : [c.name]).map((o) => {
                return o.toLowerCase();
            });
            operators = operators.concat(lowerCase);
            this.evals = this.evals.concat(lowerCase);
        });
        
        this.operators = (operators as any).unique();
        this.evals = (this.evals as any).unique();
        
    }
    
    $onInit() {
        if (!this.group) this.group = angular.copy(QUERY_INTERFACE);
        
        if (!this.fieldValue) this.fieldValue = 'value';
        
        if (!this.fieldName) this.fieldName = 'name';
        
        /*
         Get all the valid operand
         */
        this.fields.map((o) => {
            this.operands.push(o[this.fieldName]);
        });
        
        this.onGroupChange();
    }
    
    
    $doCheck() {
        
        /*
         This will be trigger when the output string is changes from outside source
         other than query builder
         */
        if (!angular.equals(this.queryString, this.$queryString)) {
            this.$queryString = this.queryString;
            clearTimeout(this.$timeoutPromise);
            this.$timeoutPromise = setTimeout(() => {
                this.$outputUpdate = true;
                let obj = this.parseQuery(this.queryString);
                let group = angular.toJson(obj);
                
                this.group = JSON.parse(group);
                this.onGroupChange();
                this.$scope.$digest();
            }, 500);
        }
        
        if (this.$trigger && !angular.equals(this.group, this.$group)) {
            this.$group = angular.copy(this.group);
            this.$trigger = false;
            this.trigger('onUpdate')
        }
        
    };
    
    
    private evaluateWords(words, filter, callback?) {
        let test = ``;
        let wh = [];
        let idxH = [];
        words.forEach((o, i) => {
            if (words[i + 1]) {
                let find;
                let curW = o;
                let curIdx = i + 1;
                let rWords = words.slice(curIdx);
                test = `${curW}`;
                find = filter(test.trim(), curIdx);
                if (!find)
                    rWords.forEach((rW, r) => {
                        test += ` ${rW}`;
                        curIdx += r;
                        idxH.push(curIdx);
                        find = filter(test.trim(), curIdx);
                        if (find) {
                            let regex = /\(.*?\)/g;
                            let str = test.trim();
                            let m;
                            while ((m = regex.exec(str)) !== null) str = str.replace(/\(/g, '&#40;').replace(/\)/g, '&#41;');
                            wh.push({
                                name: str,
                                idx1: i,
                                idx2: idxH.slice(-1).pop()
                            });
                            test = ``;
                            idxH = [];
                        }
                    });
                
            }
        });
        
        let wCopy = words.slice(0);
        if (callback) callback(wh);
        wh.forEach(o => {
            wCopy[o.idx1] = o.name;
            for (let i = o.idx1 + 1; i <= o.idx2; i++)wCopy[i] = undefined;
        });
        
        //clean the words
        words = wCopy.filter((o) => {
            return o !== "" && o !== undefined;
        });
        
        return words;
        
    }
    
    /**
     * It will take the query string and split into a simple single layer array to be evalualated
     * later to build the JSON filters based on the parameters
     * @param query
     */
    private split_string(query: string) {
        if (!query)return;
        //split and clean
        let words = ((query).split(/\s{0,} \s{0,}/g)).filter(o => {
            return o;
        });
        
        let qArr = [];
        let string = "";
        let vHandler = [];
        
        //evaluateWords OPERANDS
        words = this.evaluateWords(words, (comp) => {
            return this.fields.find(f => {
                return f[this.fieldName] === comp || `(${f[this.fieldName]}` === comp;
            });
        });
        
        //evaluateWords CONDITIONS
        words = this.evaluateWords(words, (comp, i) => {
            comp = comp.toLowerCase();
            let find = this.evals.find(f => {
                return f === comp || `(${f}` === comp;
            });
            if (find) {
                vHandler.push({
                    condition: find,
                    idx      : i
                })
            }
            
            return find;
        });
        
        
        //evaluateWords OPERATORS
        words = this.evaluateWords(words, (comp, i) => {
            let find = this.operators.find(f => {
                return f === comp || `(${f}` === comp;
            });
            if (find) {
                vHandler.push({
                    operators: find,
                    idx      : i
                })
            }
            
            return find;
        });
        
        
        /*
         First check all the condition and match them together
         */
        let wCopy = words.filter((o) => {
            return o;
        });
        
        
        /*
         Split strings with parenthesis
         */
        let _split = () => {
            let cQarr = wCopy.slice(0); //lets copy
            wCopy.forEach(function (o, i) {
                let regex = /\(|\)/g;
                let m = o.length > 1 ? regex.exec(o) : null;
                if (m) {
                    //push the match
                    wCopy.splice(m[0] === "(" ? i : i + 1, 0, m[0]);
                    //remove the match
                    let string = (o as any).replaceAt(m.index, "");
                    //replace the string
                    wCopy.splice(m[0] === ")" ? i : i + 1, 1, string);
                    
                }
            });
            
            if (wCopy.length !== cQarr.length) _split();
        };
        
        _split();
        words = wCopy.slice(0);
        
        let sCount = [];
        let position = 0;
        for (let i = 0; i < words.length; i++) {
            
            let test = words[i];
            if (["(", ")"].indexOf(test) === -1) {
                string += " " + words[i];
                sCount.push(i); //keep count of string adds
                if (this.evals.indexOf(test.toLowerCase()) > -1) {
                    //CHECK FOR ALL CONDITIONS AND OPERATORS
                    let isNot = words[i - 1] ? words[i - 1].toUpperCase() === "NOT" : false;
                    let cond = test;
                    if (isNot) {
                        cond = [words[i - 1], test].join(" ");
                        wCopy.splice(i, 1, cond);
                        wCopy.splice(i - 1, 1, QBKEY);
                    }
                    
                    let comp1 = string.replace(cond, "");
                    let comp2 = words[i - 1] ? words[i - 1] : null;
                    if (comp1 && [test, comp2].indexOf(comp1) < 0) {
                        wCopy.splice(i - 1, 1, comp1);
                        sCount.forEach((idx) => {
                            if (idx < (i - 1)) wCopy.splice(idx, 1, QBKEY);
                        });
                    }
                    sCount = [];//reset
                    string = "";//reset on array changes
                    
                } else if (this.operands.indexOf(string) > -1) {
                    //CHECK FOR ALL OPERANDS
                    wCopy.splice(i, 1, string);
                    sCount.forEach((idx) => {
                        if (idx < i) wCopy.splice(idx, 1, QBKEY);
                    });
                    
                    sCount = [];//reset
                    string = "";//reset on array changes
                }
            } else if (test === ")") {
                sCount = [];//reset
                string = "";//reset on array changes
            }
            
            
            position = i;
        }
        
        //CHECK FOR ALL OPERANDS
        if (string) wCopy.splice(position, 1, string);
        sCount.forEach((idx) => {
            if (idx < position) wCopy.splice(idx, 1, QBKEY);
        });
        
        
        words = wCopy.filter((o) => {
            return o !== QBKEY;
        });
        
        /*
         This loop will handle the conditions
         */
        let i = 0;
        let handler = []; //this should reset on push to qArr
        
        string = ""; //reset for new array use
        do {
            if (words[i]) {
                if (this.evals.indexOf(words[i].toLowerCase()) < 0) {
                    let regex = /^and|AND|or|OR$`/g;
                    let cond = regex.exec(words[i]);
                    /*
                     Testing for condition where the user started typing
                     AND and OR uncomplete and define its group since its a broken word
                     */
                    if (cond) {
                        handler.push(string);
                        handler.push(words[i])
                    } else {
                        string += " " + words[i];
                    }
                    
                } else if (["(", ")"].indexOf(words[i]) !== -1) {
                    handler.push(string);
                    string = "";
                    handler.push(words[i]);
                } else {
                    let regex = /(["'`])(\\?.)*?\1/g;
                    
                    let value = regex.exec(string);
                    if (value) {
                        handler.push(value.input);
                    } else {
                        handler.push(string);
                    }
                    
                    //push the condition being evalualated
                    if (words[i]) handler.push(words[i]);
                    if (handler.length > 3) {
                        qArr = qArr.concat(handler)
                        handler = [];
                    }
                    
                    string = "";
                }
            } else {
                handler.push(string);
            }
            i++;
        } while (i <= words.length);
        
        //wrapping last array string
        qArr = qArr.concat(handler);
        //clean empty strings
        qArr = qArr.filter(function (o) {
            return o !== ""
        });
        
        //clean strings
        qArr = qArr.map(function (o) {
            return o;
        });
        
        
        return qArr;
        
    }
    
    
    /**
     * Take the String and parse it into OBJECT format
     * @param queryString
     * @returns {Object}
     */
    private parseQuery(queryString: string) {

        let self: any = this;
        //take the string and break into array
        let queryArray: Array<string> = this.split_string(queryString);
        
        let newGroup = () => {
            let filters: any = angular.copy(QUERY_INTERFACE);
            
            Object.assign(filters, {
                expressions: []
            });
            
            return filters;
            
        };
        
        let newCondition = (exp: Array<string>) => {
            let expressions: any = angular.copy(QUERY_INTERFACE.expressions[0]);
            let regex = /(["'`])(\\?.)*?\1/g
            let val = regex.exec(exp[2]);
            let value = val ? exp[2].substring(1, exp[2].length - 1) : exp[2];
            let desc = regex.exec(exp[0]);
            let description = (desc ? exp[0].substring(1, exp[0].length - 1) : exp[0]).replace(/&#40;/g, '(').replace(/&#41;/g, ')')
            let field = self.fields.find(function (o) {
                return description.trim() === o[self.fieldName];
            });
            
            Object.assign(expressions, {
                values  : [],
                operator: this.conditions.find((o) => {
                    return o.symbol.indexOf(exp[1].toLowerCase()) !== -1 || o.symbol.indexOf(exp[1].toUpperCase()) !== -1
                }).value
            }, field ? {
                field: field
            } : {});
            //o.replace(/&#40;/g, '(').replace(/&#41;/g, ')')
            let dataType: string = expressions.field.hasOwnProperty(this.fieldDatatype) ? expressions.field[this.fieldDatatype] : false;
            // let values = this.defineDatatype(dataType, expressions.operator.contains('IN') ? value.split(", ") : value[0]);
            let values = this.defineDatatype(dataType, value.split(", "));
            
            
            values.forEach((v) => {
                expressions.values.push(v);
            });
            
            //remove any empty strings
            expressions.values = expressions.values.filter(function (o) {
                return o !== "" && o !== "``"
            });
            
            return expressions;
        };
        
        
        let group = newGroup();
        let parseIt = (group, arr: Array<string>) => {
            
            let expressions = [];
            if (!arr)return;
            
            for (let i = 0; i < arr.length; i++) {
                let txt = arr[i];
                if (txt === QBKEY)return;
                if (txt === "(") {
                    //defining the start of the group
                    let _group = newGroup();
                    
                    group.expressions.push(_group);
                    //clean empty strings
                    arr = arr.filter(function (o) {
                        return o !== QBKEY
                    });
                    
                    let reg = /(\()?(?:[^()]+|\([^)]+\))+(\)?)/;
                    let m = reg.exec(arr.join(" "));
                    if (m) {
                        
                        let balance = (m[0] as any).replace(/\(/, "");
                        balance = balance.replaceAt(balance.length - 1, "");
                        
                        let newStr = ((arr.join(" ")).replace(balance, ""))//.replace(/\(\s{1,}\)/, "");
                        //since of array reference add unidentified index to keep the same loop in order
                        arr = [QBKEY].concat(this.split_string(newStr) || []);
                        let handler = this.split_string(balance) || [];
                        handler = handler.filter((o) => {
                            return o;
                        });
                        expressions = [];
                        parseIt(_group, handler);
                    }
                    
                } else if (txt === ")") {
                    //defining the end of the group
                } else if (this.operators.indexOf(txt.toLowerCase()) === -1) {
                    //this is a condition
                    expressions.push(txt);
                    if (expressions.length === 3) group.expressions.push(newCondition(expressions));
                } else {
                    group.op = txt;
                    expressions = [];
                }
                
                //unique identifier
                arr[i] = QBKEY;
            }
            
        };
        
        parseIt(group, queryArray);
        return group;
    }
    
    
    private setOperator(operator: string) {
        let self: any = this;
        
        switch (operator) {
            case QUERY_CONDITIONS.IN.value:
                self.multi = true;
                self.maxChips = 9999;
                break;
            case QUERY_CONDITIONS.BETWEEN.value:
                self.multi = true;
                self.maxChips = 2;
                break;
            default:
                self.multi = false;
                self.maxChips = 1;
                break;
        }
        
    }
    
    
    private safeApply(fn?: any) {
        let scope: any = this.$scope;
        clearTimeout(this.$digestCycle);
        this.$digestCycle = setTimeout(function () {
            var phase = scope.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else if (!scope.$$phase) {
                scope.$apply(fn)
            }
        }, 0)
        
    }
    
    onOperandChange(rule: any) {
        this.$event = 'onOperandChange';
        this.$outputUpdate = false;
        this.onGroupChange();
    }
    
    onKeyUp(e: any, rule?: any) {
        let self: any = this;
        let evnt: any = e.originalEvent || e;
        this.$event = 'onKeyUp';
        this.$trigger = true;
        this.$outputUpdate = false;
        
        this.onPrefetch(evnt, rule).then((e) => {
            self.onGroupChange();
        });
    }
    
    onTagsChange(e: any) {
        this.$event = 'onTagsChange';
        this.$outputUpdate = false;
        this.onGroupChange();
        this.safeApply();
    }
    
    onConditionChange(rule: any, e?: any) {
        this.$event = 'onConditionChange';
        this.setOperator(rule.operator);
        rule.values.splice(this.maxChips);
        this.onGroupChange();
    };
    
    
    private checkExpressions(group) {
        let self: any = this;
        let conditions = [];
        let values = [];
        group.expressions.forEach(function (o, i) {
            if (o.type === 'condition') {
                conditions.push(o);
                let NullOperand: boolean = [QUERY_CONDITIONS.IS_NULL.value, QUERY_CONDITIONS.IS_NOT_NULL.value].indexOf(o.operator) !== -1;
                if (NullOperand) o.values[0] = null;
                
                let hasValue: boolean = o.values ? angular.isDefined(o.values[0]) : false;
                let hasOperand: boolean = o.field ? o.field[self.fieldValue] : false;
                if ((NullOperand || hasValue) && hasOperand) values.push(i)
                
            } else {
                self.checkExpressions(o)
            }
        });
        /*
         Add a new row for new field entry
         */
        if (conditions.length > 0 && values.length === conditions.length) {
            this.AddCondition(group, values[values.length - 1] + 1);
        } else if (conditions.length == 0) {
            this.AddCondition(group, 0);
        }
        
    }
    
    
    onChange(e?: any) {
        this.onGroupChange(e);
    }
    
    private onGroupChange(e?: any) {
        clearTimeout(this.$timeoutPromise);
        this.$event = e || 'onGroupChange';
        this.checkExpressions(this.group);
        this.setFieldsDescription(this.group);
        this.trigger('onUpdate');
    }
    
    
    private setFieldsDescription(group) {
        
        let self: any = this;
        //depends where the change came from find by
        let findBy: string = self.$outputUpdate ? self.fieldName : self.fieldValue;
        group.expressions.forEach(function (condition, i) {
            if (condition.type === 'condition') {
                let found = self.fields.find(function (o) {
                    return condition.field[findBy] === o[findBy]
                });
                if (found) Object.assign(condition.field, found);
                
                
                let dataType: string = condition.field.hasOwnProperty(self.fieldDatatype) ? condition.field[self.fieldDatatype] : false;
                
                
            } else {
                self.setFieldsDescription(condition)
            }
        });
    };
    
    AddCondition(group, idx?: number) {
        
        var condition = angular.copy(QUERY_INTERFACE.expressions[0], {
            $$indeed: this.$countCondition,
            values  : []
        });
        
        if (idx > -1) {
            group.expressions.splice(idx, 0, condition);
        } else {
            group.expressions.push(condition);
        }
        
    }
    
    AddGroup(e?: any) {
        this.$event = 'AddGroup';
        this.group.expressions.push(angular.copy(QUERY_INTERFACE));
    }
    
    RemoveGroup(e?: any) {
        this.$event = 'RemoveGroup';
        
        let self: any = this;
        this.onDelete({
            $event: {
                group: self.group
            }
        })
    }
    
    RemoveCondition(idx: number, e?: any) {
        
        this.$event = 'RemoveCondition';
        let self: any = this;
        this.$countCondition = 0;
        this.group.expressions.map(function (o) {
            if (o.type === 'condition') self.$countCondition++;
        });
        if (this.$countCondition === 1)return;
        this.group.expressions.splice(idx, 1);
        
        //avoid trigger changes
        this.$group = this.group;
        this.onGroupChange();
    }
    
    /**
     * OUTPUT
     */
    onDeleteGroup(e: any) {
        let self: any = this;
        let gCopy = this.group.expressions.slice(0);
        gCopy.forEach(function (o, i) {
            if (o.$$hashKey === e.group.$$hashKey && o.$$indeed === e.group.$$indeed)
                self.group.expressions.splice(i, 1)
        });
        
        this.onGroupChange();
    }
    
    onUpdateGroup(e: any) {
        this.trigger('onUpdate');
    }
    
    private CleanObject() {
        const regex = /\{"type":"condition".*?"values":\[\]\}/g;
        let str: string = angular.toJson(this.group);
        let m;
        
        while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            m.forEach(function (match) {
                try {
                    let obj = JSON.parse("[" + match + "]");
                    obj.forEach(function (o) {
                        if (!o.values.length) {
                            let search = JSON.stringify(o);
                            let re = str.split(search);
                            str = re.join("");
                        }
                    })
                } catch (e) {
                }
            });
        }
        //clean up the json
        str = str.replace(/,\]/g, "]").replace(/\[,/g, "[").replace(/,,/g, ",");
        
        return this.setDatatypes(JSON.parse(str));
    }
    
    private setDatatypes(group) {
        
        let self: any = this;
        group.expressions.forEach(function (o, i) {
            if (o.type === 'condition') {
                let dataType: string = o.field.hasOwnProperty(self.fieldDatatype) ? o.field[self.fieldDatatype] : false;
                o.values = angular.isDefined(o.values[0]) ? self.defineDatatype(dataType, o.values) : [];
            } else {
                self.setDatatypes(o)
            }
        });
        
        return group;
    };
    
    
    trigger(event: string) {
        let self: any = this;
        let string: Array<string> = this.stringifyQuery(this.group);
        //update both if updated from object
        this.$queryString = this.queryString = string.join(' ');
        
        this.$outputUpdate = false;
        
        if (this.queryString !== this.$queryString) this.queryString = this.$queryString;
        
        
        // if (this.$event === 'RemoveCondition') this.queryString = this.$queryString;
        // if (this.$queryString) this.queryString = this.$queryString;
        
        this[event]({
            $event: {
                event : self.$event,
                group : self.CleanObject(),
                string: self.queryString
            }
        })
        
    }
    
    onPrefetch(e: any, rule?: any) {
        let self: any = this;
        
        return new Promise((resolve) => {
            let $event: any = {$event: e};
            if (rule) Object.assign($event, {
                group : rule,
                target: 'input'
            });
            
            if (e.$event) Object.assign($event, e);
            this.onFetch({
                $event: $event
            });
            
            /*
             It may loose focus on external library injections, ex: typeahead.js
             */
            $event.$event.target.focus();
            resolve(e.target);
        })
    }
    
    
    onValueChange(e: any) {
        this.$event = 'onValueChange';
        let self: any = this;
        let a = [];
        Object.keys(e).forEach((k) => {
            a.push(e[k]);
        });
        
        this.onPrefetch.apply(this, a).then((e) => {
            self.onGroupChange();
        });
    }
    
    $onDestroy() {
        clearTimeout(this.$timeoutPromise);
        clearTimeout(this.$digestCycle);
    }
}


require('./query.less');

export class QueryBuilder implements ng.IComponentOptions {
    public bindings: any;
    public template: any;
    public controller: any;
    
    
    constructor() {
        this.bindings = {
            onDelete     : '&',
            onUpdate     : '&',
            onFetch      : '&onValueChange',
            fieldValue   : '@?',
            fieldName    : '@?',
            fieldDatatype: '@?',
            queryString  : '=?',
            $$index      : '<',
            group        : '=',
            fields       : '<operands'
        };
        
        this.template = require('./query-builder.component.html');
        this.controller = QueryBuilderCtrl;
    }
}
