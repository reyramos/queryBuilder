'use strict';

export module Public {

    export let routes: Array<any> = [
        {
            name    : 'rootBundle',
            abstract: true,
            url     : "/",
        },
        {
            name    : 'rootBundle.root',
            template: require('./views/index.html'),
            abstract: true,
            resolve : {
                register: ['jsBundleResolver', function (jsBundleResolver) {
                    return jsBundleResolver((app, resolve) => {
                        (require as any).ensure([], function () {
                            app.register(require('./public'));
                            resolve();
                        });
                    });
                }]
            }
        }
    ];
}


