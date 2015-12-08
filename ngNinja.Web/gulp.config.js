module.exports = function () {
    var lessClient = './content/';
    var temp = './.tmp/';
    var client = './build/';
    var clientApp = './scripts/' + 'app/';
    var root = './';
    var report = './report/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({ devDependencies: true })['js'];
    var specRunnerFile = './view/jasmine/specrunner.cshtml';

    var config = {
        temp: temp,

        alljs: [
            './scripts/app/**/*.js',
            './*.js',
            '!./scripts/app/**/*-spec.js*/'
        ],

        less: lessClient + 'less/*.less',

        css: lessClient + 'main.css',

        client: client,

        indexForWireDep: './views/home/' + 'index.cshtml',

        indexForUseref: './build/index.cshtml',

        build: './build/',

        images: './images/**/*.*',

        htmltemplates: clientApp + '**/*.html',

        root: root,

        specHelpers: [client + 'test-helpers/*.js'],

        serverIntegrationSpecs: [client + 'tests/server-integration/**/*.spec.js'],

        specRunner: specRunnerFile,

        specRunnerFile: specRunnerFile,

        templateCache: {
            file: 'templates.js',
            options: {
                module: 'onBoardingApp',
                standAlone: false,
                root: 'scripts/app/'
            }
        },

        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        js: [
            clientApp + 'modules/home/**/*.js',
            clientApp + 'modules/layout/**/*.js',
            clientApp + '/app*.js',
            clientApp + 'shared/services/**/webapiservice.js',
            '!' + clientApp + '**/*-spec.js'
        ],

        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },

        packages: [
            './package.json',
            './bower.json'
        ],
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    config.karma = getKarmaOptions();

    return config;

    ////////////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                //bowerFiles,
                //config.specHelpers,
                //client + '**/*.module.js',
                //client + '**/*.js',
                //temp + config.templateCache.file,
                //config.serverIntegrationSpecs
                './scripts/lib/angular/angular.js',
				'./scripts/lib/angular/angular-mocks.js',
				'./scripts/app/modules/candidate/js/onBoardingApp.candidate.services.js',
				'./scripts/app/modules/candidate/test/onBoardingApp.candidate.services-spec.js',
                './scripts/app/modules/candidate/js/onBoardingApp.candidate.controller.js',
				'./scripts/app/modules/candidate/test/onBoardingApp.candidate.controller-spec.js'
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    { type: 'html', subdir: 'report-html' },
                    { type: 'lcov', subdir: 'report-lcov' },
                    { type: 'text-summary' }
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[clientApp + '**/!(*-spec)+(.js)'] = ['coverage'];
        return options;
    }
};
