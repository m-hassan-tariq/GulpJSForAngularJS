var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({ lazy: true });
var browserSync = require('browser-sync');
var path = require('path');
var _ = require('lodash');
var protractor = require("gulp-protractor").protractor;
var jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function () {
	log('Analyzing source with JSHint and JSCS');

	return gulp
		.src(config.alljs)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
		.pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function () {
	log('Compiling Less --> CSS');

	return gulp
		.src(config.less)
		.pipe($.plumber())
		.pipe($.less())
		.pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
		.pipe(gulp.dest(config.temp));
});

gulp.task('fonts', ['clean-fonts'], function () {
	log('Copying fonts');

	return gulp
		.src(config.fonts)
		.pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function () {
	log('Copying and compressing the images');

	return gulp
		.src(config.images)
		.pipe($.imagemin({ optimizationLevel: 4 }))
		.pipe(gulp.dest(config.build + 'images'));
});

gulp.task('clean', function () {
	var delconfig = [].concat(config.build, config.temp);
	log('Cleaning: ' + $.util.colors.blue(delconfig));
	del(delconfig);
});

gulp.task('clean-fonts', function () {
	clean(config.build + 'fonts/**/*.*');
});

gulp.task('clean-images', function () {
	clean(config.build + 'images/**/*.*');
});

gulp.task('clean-styles', function () {
	clean(config.temp + '**/*.css');
});

gulp.task('clean-code', function () {
	var files = [].concat(
		config.temp + '**/*.js',
		config.build + '**/*.html',
		config.build + 'js/**/*.js'
	);
	clean(files);
});

gulp.task('less-watcher', function () {
	gulp.watch([config.less], ['styles']);
});

gulp.task('templatecache', function () {
	log('Creating AngularJS $templateCache');

	return gulp
		.src(config.htmltemplates)
		.pipe($.minifyHtml({ empty: true }))
		.pipe($.angularTemplatecache(
			config.templateCache.file,
			config.templateCache.options
			))
		.pipe(gulp.dest(config.temp));
});


gulp.task('wiredep', function () {
	log('Wire up the bower css js and our app js into the html');
	var options = config.getWiredepDefaultOptions();
	var wiredep = require('wiredep').stream;

	return gulp
		.src(config.indexForWireDep)
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.js)))
		.pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'templatecache'], function () {
	log('Wire up the app css into the html, and call wiredep ');

	return gulp
		.src(config.indexForWireDep)
		.pipe($.inject(gulp.src(config.css)))
		.pipe(gulp.dest(config.client));
});

gulp.task('optimize', ['wiredep', 'templatecache'], function () {
	log('Optimizing the javascript, css, html');

	var assets = $.useref.assets({ searchPath: './' });
	var templateCache = config.temp + config.templateCache.file;

	return gulp
		.src(config.indexForUseref)
		.pipe($.plumber())
		.pipe($.inject(gulp.src(templateCache, { read: false }), {
			starttag: '<!-- inject:templates:js -->'
		}))
		.pipe(assets)
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe(gulp.dest(config.build));
});

gulp.task('optimizeMangling', ['wiredep', 'templatecache'], function () {
	log('Optimizing the javascript, css, html');

	var assets = $.useref.assets({ searchPath: './' });
	var templateCache = config.temp + config.templateCache.file;
	var cssFilter = $.filter('**/*.css');
	var jsFilter = $.filter('**/*.js');

	return gulp
		.src(config.indexForUseref)
		.pipe($.plumber())
		.pipe($.inject(gulp.src(templateCache, { read: false }), {
			starttag: '<!-- inject:templates:js -->'
		}))
		.pipe(assets)
		.pipe(cssFilter)
		.pipe($.csso())
		.pipe(cssFilter.restore())
		.pipe(jsFilter)
		.pipe($.uglify())
		.pipe(jsFilter.restore())
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe(gulp.dest(config.build));
});

gulp.task('optimizeAngularDI', ['wiredep', 'templatecache'], function () {
	log('Optimizing the javascript, css, html');

	var assets = $.useref.assets({ searchPath: './' });
	var templateCache = config.temp + config.templateCache.file;
	var cssFilter = $.filter('**/*.css');
	var jsLibFilter = $.filter('**/' + config.optimized.lib);
	var jsAppFilter = $.filter('**/' + config.optimized.app);


	return gulp
		.src(config.indexForUseref)
		.pipe($.plumber())
		.pipe($.inject(gulp.src(templateCache, { read: false }), {
			starttag: '<!-- inject:templates:js -->'
		}))
		.pipe(assets)
		.pipe(cssFilter)
		.pipe($.csso())
		.pipe(cssFilter.restore())
		.pipe(jsLibFilter)
		.pipe($.uglify())
		.pipe(jsLibFilter.restore())
		.pipe(jsAppFilter)
		.pipe($.ngAnnotate())
		.pipe($.uglify())
		.pipe(jsAppFilter.restore())
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe(gulp.dest(config.build));
});

gulp.task('optimizeVersioning', ['wiredep', 'templatecache'], function () {
	log('Optimizing the javascript, css, html');

	var assets = $.useref.assets({ searchPath: './' });
	var templateCache = config.temp + config.templateCache.file;
	var cssFilter = $.filter('**/*.css');
	var jsLibFilter = $.filter('**/' + config.optimized.lib);
	var jsAppFilter = $.filter('**/' + config.optimized.app);


	return gulp
		.src(config.indexForUseref)
		.pipe($.plumber())
		.pipe($.inject(gulp.src(templateCache, { read: false }), {
			starttag: '<!-- inject:templates:js -->'
		}))
		.pipe(assets)
		.pipe(cssFilter)
		.pipe($.csso())
		.pipe(cssFilter.restore())
		.pipe(jsLibFilter)
		.pipe($.uglify())
		.pipe(jsLibFilter.restore())
		.pipe(jsAppFilter)
		.pipe($.ngAnnotate())
		.pipe($.uglify())
		.pipe(jsAppFilter.restore())
		.pipe($.rev())
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe($.revReplace())
		.pipe(gulp.dest(config.build))
		.pipe($.rev.manifest())
		.pipe(gulp.dest(config.build));
});

gulp.task('bump', function () {
	var msg = 'Bumping versions';
	var type = args.type;
	var version = args.version;
	var options = {};
	if (version) {
		options.version = version;
		msg += ' to ' + version;
	} else {
		options.type = type;
		msg += ' for a ' + type;
	}
	log(msg);

	return gulp
		.src(config.packages)
		.pipe($.print())
		.pipe($.bump(options))
		.pipe(gulp.dest(config.root));
});

gulp.task('test', function (done) {
	startTests(true /* singleRun */, done);
});

gulp.task('autotest',  function (done) {
	startTests(false /* singleRun */, done);
});

gulp.task('e2e', function (done) {
	gulp.src(__dirname + './protractor_test/')
	.pipe(protractor({
		configFile: './protractor.config.js',
		args: ['--baseUrl', 'http://127.0.0.1:8000']
	}))
	.on('error', function (e) { throw e })
});

gulp.task('jasmineBrowser', function () {
	return gulp.src(config.karma.files)
	  .pipe(jasmineBrowser.specRunner())
	  .pipe(jasmineBrowser.server({ port: 8888 }));
});

gulp.task('build', ['optimize', 'images', 'fonts'], function () {
	log('Building everything');

	var msg = {
		title: 'gulp build',
		subtitle: 'Deployed to the build folder',
		message: 'Running `gulp serve-build`'
	};
	del(config.temp);
	log(msg);
	notify(msg);
});

gulp.task('browser-sync', function () {
	if (browserSync.active) {
		return;
	}

	log('Starting browser-sync on port ' + 3472);

	var options = {
		proxy: 'localhost:' + 3472,
		port: 3470,
		files: [
			'./scripts/**/*.*'
		],
		ghostMode: {
			clicks: true,
			location: false,
			forms: true,
			scroll: true
		},
		injectChanges: true,
		logFileChanges: true,
		logLevel: 'debug',
		logPrefix: 'gulp-patterns',
		notify: true,
		reloadDelay: 1000 //1000
	};

	browserSync(options);

});

////////////

function notify(options) {
	var notifier = require('node-notifier');
	var notifyOptions = {
		sound: 'Bottle',
		contentImage: path.join(__dirname, 'gulp.png'),
		icon: path.join(__dirname, 'gulp.png')
	};
	_.assign(notifyOptions, options);
	notifier.notify(notifyOptions);
}

function startTests(singleRun, done) {
	var karma = require('karma').server;
	var excludeFiles = [];
	var serverSpecs = config.serverIntegrationSpecs; //TODO

	excludeFiles = [];

	karma.start({
		configFile: __dirname + '/karma.config.js',
		exclude: excludeFiles,
		singleRun: !!singleRun
	}, karmaCompleted);

	function karmaCompleted(karmaResult) {
		log('Karma completed!');
		if (karmaResult === 1) {
			done('karma: tests failed with code ' + karmaResult);
		} else {
			done();
		}
	}
}

function clean(path) {
	log('Cleaning: ' + $.util.colors.blue(path));
	del(path);
}

function log(msg) {
	if (typeof (msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}
