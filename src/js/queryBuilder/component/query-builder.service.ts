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
    private conditions: Array<any> = [];
    
    constructor(private fieldName: string = 'name', private fieldDatatype: string = 'dataType') {
        Object.keys(QUERY_CONDITIONS).forEach((k) => {
            this.conditions.push(QUERY_CONDITIONS[k])
        })
    }
    
    
    private defineDatatype(dataType, values) {
        values = Array.isArray(values) ? values : [values];
        let num = (values.slice(0)).map((f) => {
            return typeof f === 'string' ? f.trim() : f;
        });
        
        if (dataType)
            switch (dataType.toUpperCase()) {
                case 'NUMBER':
                case 'INTEGER':
                case 'FLOAT':
                    num = values.map((v) => {
                        return Number(v);
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
    
    stringify(group: any, update: boolean = false) {
        let string: Array<string> = this.stringifyQuery(group, update);
        let $string: string = string ? string.join(' ') : "";
        return $string;
    }
    
    /**
     * Will take the query string and stringify
     * @param group
     * @param update {boolean} will force ticks around values, to be used within user text input box
     * @returns {Array}
     */
    private stringifyQuery(group: any, update: boolean = false) {
        if (!group) return;
        var str = [];
        angular.forEach(group.expressions, (o, i) => {
            if (o.type === 'condition') {
                // var values = o.values[0] ? o.values.join(", ") : "";
                
                if (!o.field || !o.field[this.fieldName])return;
                if (i !== 0) str.push(group.op);
                
                str.push(o.field[this.fieldName]);
                
                let dataType: string = o.field.hasOwnProperty(this.fieldDatatype) ? o.field[this.fieldDatatype] : false;
                let values = angular.isDefined(o.values[0]) ? (this.defineDatatype(dataType, o.values)).unique().join(", ") : "";
                
                
                let condition = this.conditions.find(function (q) {
                    return o.operator === q.value;
                }).symbol;
                
                str.push(Array.isArray(condition) ? condition[0] : condition);
                
                let ticks = "`";
                str.push(update ? values : ticks + values + ticks);
                
            } else {
                var comp = this.stringifyQuery(o, update);
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
