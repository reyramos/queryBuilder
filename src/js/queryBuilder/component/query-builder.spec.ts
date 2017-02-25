/**
 * Created by reyra on 2/24/2017.
 */
import * as angular from "angular";


describe('Query Builder', () => {
    var element,
        scope;

    // load the service's module
    beforeEach(require('../index').name);

    beforeEach(inject(function () {
            // scope = $rootScope.$new();
            // element = angular.element([
            //     '<ul><li ng-repeat="p in [] | range:3 track by $index">{{$index}}</li></ul>'
            // ].join(' '));
            // $compile(element)(scope);
            // scope.$digest();
        })
    );

    // it('should have 3 li element', function () {
    //     var ele = element.find('li');
    //     expect(ele.length).toBe(3);
    // });

});
