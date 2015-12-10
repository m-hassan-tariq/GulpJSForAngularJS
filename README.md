# Gulp.JS For AngularJS
Using Gulp.JS to specify units of work in angularJS

# Content is still under progress

###Core Feature of Gulp###
- Minification
- Concatenation
- Vendor prefixes
- Less to CSS compilation
- Optimizing 3rdparty and custom code
- Injecting files into HTML
- File revisions and versioning
- Caching Angular templates
- Testing
- Code analysis

It streamline your SDLC cycle more efficiently using flow of continuous integration, testing and development. It help to improve quality, deliver faster and consistent. 

![1](https://cloud.githubusercontent.com/assets/10474169/11699271/387c7ba2-9e89-11e5-8feb-1134d25725af.png)

###Difference between Grunt and Gulp###

Gulp is more codish as compare to grunt which is more into configuration, so Gulp is more readable, easier to debug. Its stream based so used node more readily. 

![2](https://cloud.githubusercontent.com/assets/10474169/11699406/d05a0174-9e89-11e5-8748-75b5ad4bae43.png)

###Gulp Workflow###

- Fetch files to be modify
- Modify the files
- Create new files

![3](https://cloud.githubusercontent.com/assets/10474169/11700170/ea842c06-9e8d-11e5-93c3-c02add86dff4.png)

Since Gulp is stream based, so in pipeline architecture, diagram would be as follows

![4](https://cloud.githubusercontent.com/assets/10474169/11700250/57430c2c-9e8e-11e5-82cc-a6ff65e6b75f.png)

![5](https://cloud.githubusercontent.com/assets/10474169/11700307/b65be634-9e8e-11e5-970d-f3f304641a14.png)

###Gulp API###

- gulp.task == Define a task
- gulp.src == read files
- gulp.dest == write the files
- gulp.watch == watch the files when making code changes

		gulp.task('TaskName', [dependencyItem], function () {
			return gulp
				.src('./sourcePath')
				.pipe(operation)
				.pipe(gulp.dest('./destinationPath'));
		});

1. **gulp.task**

		gulp.task(taskName [, arary of dependencies], function)
	
	- Register a task
	- dependencies are optional
	- dependencies are executed in parallel not in sequential order
	- Actual task is executed soon after completion of dependencies

2. **gulp.src**

		gulp.src(file path [, options])
	
	- Fetch set of files to be modified
	- Wildcard operators may be used to emit/add files
	- Optionally specify options to apply to set of files (e.g. how much of path to be retained)

3. **gulp.dest**

		gulp.dest(output folder path [, options])
	
	- Modified files are written to destination output folder
	- Write piped files to new file or same file
	- Optionally specify options to apply to set of output files or folder
	
4. **gulp.watch**

	Used to monitor files when altering code during development

			gulp.watch(file path [, options], [task name])
	
	- Execute single or multiple tasks for the files matched with the file path
	- Optionally specify options to apply to set of files
	
			gulp.watch(file path [, options], CallbackFunction)
	
	- Execute call back function for the files matched with the file path
	- Optionally specify options to apply to set of files

###Installation###

![6](https://cloud.githubusercontent.com/assets/10474169/11702361/b1640cb2-9e9b-11e5-994a-b1c3b4cda471.png)

**Key players**

1. Visual Studio
2. NodeJS
3. NPM
4. Bower
5. Gulp

**Step 1: Installer**

- [Node.js](https://nodejs.org/en/)
- [Github](https://git-scm.com/download/win)

Please note you may also use chocolatey for installing nodejs and github

*"Chocolatey is a package manager for Windows (like apt-get but for Windows). It was designed to be a decentralized framework for quickly installing applications and tools that you need. It is built on the NuGet infrastructure currently using PowerShell as its focus for delivering packages from the distros to your door, err computer."*

[Chocolatey](https://chocolatey.org/)

		choco install nodejs
		choco install nodejs.install
		choco install git 
		choco install git.install 

**Step 2: Visual Studio Extensions**

- [Node.js Tools for Visual Studio](https://www.visualstudio.com/features/node-js-vs)
- [Package Intellisense](https://visualstudiogallery.msdn.microsoft.com/65748cdb-4087-497e-a394-2e3449c8e61e)
- [Web Essentials](http://vswebessentials.com/)
- [Task Runner Explorer](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708)

Optional:
- [Grunt Launcher](https://visualstudiogallery.msdn.microsoft.com/dcbc5325-79ef-4b72-960e-0a51ee33a0ff)
- [TypeScript 1.4 for Visual Studio 2013](https://visualstudiogallery.msdn.microsoft.com/2d42d8dc-e085-45eb-a30b-3f7d50d55304)

**Step 3: Global Node Packages**

Install packages for CLI globally, This will enable glup and bower command line interfaces

- NPM
- bower
- gulp

		npm install -g npm
		npm install -g bower
		npm install -g gulp

Please note: [NPM will be automatcially downloaded with node js installer](http://blog.npmjs.org/post/85484771375/how-to-install-npm)


**Step 4: Create npm and bower dependencies files**

- In order to handle server side packages, create *packages.json* file:

		npm init

- In order to handle client side packages, create *bower.json* file:

		bower init

**Step 5: Project specific Node Packages**

- gulp

		npm install --save-dev gulp

	--save-dev store packages to devDependencies in *package.json* file
	
	--save store packages to dependencies in *package.json* file

**Step 6: Project specific Bower Packages**

		bower install angular --save
		bower install lodash --save
		bower install jasmine --save
	
For specific version of bower packages you may used *#versionNumber*

		bower install angularjs#v1.3.8 --save
		bower install lodash#v3.10.1 --save

**Step 7: Add gulp config file in project**

Add gulpfile.js in project and paste below code in it.

		var gulp = require('gulp');
		gulp.task('testing', function () {
		    console.log('Hello world!');
		});

**Step 8: Executing Gulp Task**

Now execute *testing* task in CMD (make sure CMD refer to project path)

		gulp testing


###Style Guidelines for Gulp configuration file###

- Avoid magic strings out of gulp file in order to make things simple, maintainable and easy to read. Introduce them in gulp.config.js file for instance file path, global gulp variables, wildcard strings etc

	![8](https://cloud.githubusercontent.com/assets/10474169/11723141/44663bb6-9f32-11e5-9a55-87fafd7aa3d9.png)

- Use **gulp-load-plugins** for lazy laoding, Loads in any gulp plugins and attaches them to the global scope, or an object of your choice.

		$ npm install --save-dev gulp-load-plugins

	Code Before: 
			
			var gulp = require('gulp');
			var jshint = require('gulp-jshint');
			
			gulp.task('jshint', function () {
		  		return gulp
				.src('./file.js')
				.pipe(jshint())
				.pipe(jshint.reporter('YOUR_REPORTER_HERE'));
			});
	
	Code Before: 
			
			var gulp = require('gulp');
			var $ = require('gulp-load-plugins')({ lazy: true });
			
			gulp.task('jshint', function () {
			    return gulp
				.src('./file.js')
				.pipe($.jshint())
	    			.pipe($.jshint.reporter('YOUR_REPORTER_HERE'));
			});

- Use **yargs** for picking up argument from CLI. Using this plugin you may get node.js command line arguments. 

		npm install yargs

	For example:
	
			var args = require('yargs').argv;
			var gulp = require('gulp');
			var $ = require('gulp-load-plugins')({ lazy: true });
			gulp.task('jshint', function () {
			    return gulp
				.src('./file.js')
				.pipe($.jshint())
				.pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
	    			.pipe($.jshint.reporter('YOUR_REPORTER_HERE'));
			});
	
	Command:
			gulp jshint --verbose
	
	*verbose is argument to show file list*
	



Images created by john papa




