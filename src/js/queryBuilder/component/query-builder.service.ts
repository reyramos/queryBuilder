/**
 * Created by Ramor11 on 4/20/2017.
 */
import * as angular from "angular";
import {QUERY_OPERATORS, QUERY_CONDITIONS} from "./query.conditions";
import {QUERY_INTERFACE} from "./query.interface";
import {type} from "os";
import {Injectable} from "angular";


declare let window: any;
declare let $: any;
declare let Array: any;
declare let String: any;


const QBKEY: string = "$$QueryBuilder";

// @Injectable()
export class QueryBuilderService {
    
    static instance: QueryBuilderService;
    public conditions: Array<any> = [];
    public fieldName: string;
    public fieldDatatype: string = "dataType";
    public $outputUpdate: boolean = false;
    
    constructor() {
        Object.keys(QUERY_CONDITIONS).forEach((k) => {
            this.conditions.push(QUERY_CONDITIONS[k])
        })
    }
    
    
    public defineDatatype(dataType, values) {
        values = (Array.isArray(values) ? values : [values]).map((v) => {
            return typeof(v) === 'string' ? v.trim() : v;
        });
        
        let num = (values.slice(0)).filter((f) => {
            return f;
        });
        
        if (dataType)
            switch (dataType.toUpperCase()) {
                case 'NUMBER':
                case 'INTEGER':
                case 'FLOAT':
                    num = values.map((v) => {
                        //if the string has comma is will be NaN
                        return v ? Number(typeof v === 'string' ? v.replace(/,/g, '') : v) : null;
                    });
                    break;
                // case 'DATETIME':
                //     num = values.map((v) => {
                //         return moment(v).format('MM/DD/YYYY');
                //     });
                //     break;
                
            }
        
        
        return num.unique();
    }
    
    
    stringify(group: any) {
        
        if (!this.fieldName)throw "MISSING FIELDNAME";
        
        if (!this.fieldDatatype)throw "MISSING FIELDNAME";
        
        this.$outputUpdate = false;
        
        let string: Array<string> = this.stringifyQuery(group);
        let $string: string = string ? string.join(' ') : "";
        return $string;
    }
    
    /**
     * Will take the query string and stringify
     * @param group
     * @returns {Array}
     */
    protected stringifyQuery(group: any) {
        let self: any = this;
        
        if (!group) return;
        var str = [];
        angular.forEach(group.expressions, function (o, i) {
            if (o.type === 'condition') {
                // var values = o.values[0] ? o.values.join(", ") : "";
                
                if (!o.field || !o.field[self.fieldName])return;
                if (i !== 0) str.push(group.op)
                
                str.push(o.field[self.fieldName]);
                
                let dataType: string = o.field.hasOwnProperty(self.fieldDatatype) ? o.field[self.fieldDatatype] : false;
                let values: string = null;
                values = angular.isDefined(o.values[0]) ? (self.defineDatatype(dataType, o.values)).unique().join(", ") : "";
                
                
                let condition = self.conditions.find(function (q) {
                    return o.operator === q.value;
                }).symbol;
                
                str.push(Array.isArray(condition) ? condition[0] : condition);
                
                if (values !== null) {
                    let ticks = "`";
                    str.push(self.$outputUpdate ? values : ticks + values + ticks);
                }
                
            } else {
                var comp = self.stringifyQuery(o);
                if (comp.length) {
                    if (str.length) str.push(group.op);
                    if (comp.length > 3) {
                        comp.unshift("(");
                        comp.push(")");
                    }
                    str = str.concat(comp);
                }
                
            }
        });
        
        return str
        
    }
    
    
}


export type QueryBuilderServiceFactory = () => QueryBuilderService;
