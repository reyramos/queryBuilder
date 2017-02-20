"use strict";
/**
 * Created by reyra on 1/31/2017.
 */
require('bootstrap-tagsinput/src/bootstrap-tagsinput');
require('bootstrap-tagsinput/src/bootstrap-tagsinput.css');
var angular = require("angular");
var TagsComponentCtrl = (function () {
    function TagsComponentCtrl($element) {
        this.$element = $element;
        this.model = [];
        this.$model = [];
        this.$id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + Date.now().toString();
        this.select = $($element.find('input[type="text"]')[0]);
        this.hidden = angular.element($element.find('input[type="hidden"]')).controller('ngModel');
    }
    TagsComponentCtrl.prototype.RenderInit = function () {
        var self = this;
        var options = {
            itemValue: self.itemvalue,
            itemText: self.itemtext,
            trimValue: true,
            confirmKeys: self.confirmkeys ? JSON.parse(self.confirmkeys) : [13],
            tagClass: typeof self.tagClass === "function" ? self.tagClass : function (item) {
                return self.tagclass;
            }
        };
        if (self.options)
            Object.assign(options, self.options);
        self.select.tagsinput(options);
        if (self.model.length)
            self.model.forEach(function (m) {
                self.select.tagsinput('add', m);
            });
        self.select.on('itemAdded', function (event) {
            if (self.model.indexOf(event.item) === -1) {
                self.model.push(event.item);
                self.CheckModel();
            }
        });
        self.select.on('itemRemoved', function (event) {
            var idx = self.model.indexOf(event.item);
            if (idx !== -1)
                self.model.splice(idx, 1);
            self.CheckModel();
        });
    };
    TagsComponentCtrl.prototype.$onInit = function () {
        var self = this;
        if (!this.name)
            this.name = this.$id;
        if (!this.required)
            this.required = false;
        if (this.ngModel)
            this.ngModel.$render = function () {
                self.model = !Array.isArray(this.$viewValue) ? [] : this.$viewValue.slice(0);
                self.RenderInit();
            };
    };
    TagsComponentCtrl.prototype.CheckModel = function () {
        var self = this;
        if (!angular.equals(this.model, this.$model)) {
            this.$model = angular.copy(this.model);
            this.ngModel.$setValidity("tags-invalid", !!this.model.length);
            this.ngModel.$setViewValue(this.model, 'change');
            self.select.tagsinput('removeAll');
            self.model.forEach(function (m) {
                self.select.tagsinput('add', m);
            });
            this.ngChange({
                $event: {
                    $element: self.$element,
                    model: self.model
                }
            });
        }
    };
    TagsComponentCtrl.prototype.$doCheck = function () {
        var self = this;
        this.CheckModel();
    };
    ;
    TagsComponentCtrl.prototype.$postLink = function () {
        var self = this;
        setTimeout(function () {
            var input = self.$element.find('input');
            input[0].placeholder = self.placeholder || "";
        }, 1);
    };
    TagsComponentCtrl.prototype.$onDestroy = function () {
        clearTimeout(this.Timeout);
        clearTimeout(this.TagsTimeout);
        this.select.tagsinput('destroy');
    };
    return TagsComponentCtrl;
}());
TagsComponentCtrl.$inject = ['$element'];
require('./tags.less');
var TagsComponent = (function () {
    function TagsComponent() {
        this.require = {
            ngModel: '^?',
            form: '^^?'
        };
        this.bindings = {
            ngChange: '&',
            placeholder: '<',
            label: '<',
            name: '<',
            required: '<',
            note: '<',
            disabled: '<',
            options: '<',
            typeaheadSource: "<",
            tagclass: "<",
            itemvalue: "@",
            itemtext: "@",
            confirmKeys: "@"
        };
        this.template = require('./tags.html');
        this.controller = TagsComponentCtrl;
    }
    return TagsComponent;
}());
exports.TagsComponent = TagsComponent;
//# sourceMappingURL=tags.component.js.map