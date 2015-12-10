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

- Visual Studio
- NodeJS
- NPM
- Bower
- Gulp

**Visual Studio Extensions**

- [Node.js Tools for Visual Studio](https://www.visualstudio.com/features/node-js-vs)
- [Package Intellisense](https://visualstudiogallery.msdn.microsoft.com/65748cdb-4087-497e-a394-2e3449c8e61e)
- [Web Essentials](http://vswebessentials.com/)
- [Task Runner Explorer](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708)

Optional:
- [Grunt Launcher](https://visualstudiogallery.msdn.microsoft.com/dcbc5325-79ef-4b72-960e-0a51ee33a0ff)
- [TypeScript 1.4 for Visual Studio 2013](https://visualstudiogallery.msdn.microsoft.com/2d42d8dc-e085-45eb-a30b-3f7d50d55304)


**App Config contains routing info and App Run contains startup logic**

![5](https://cloud.githubusercontent.com/assets/10474169/11671602/2f3e3e46-9dcf-11e5-9d53-8ddc3bfb8552.png)

**Controller Structure**
-	JS closure using IIFE
-	Controller As implementation to avoid $scope var every time in code
-	Named function for controller
-	Function declarations to abstract underline detail
-	Bindable members upfront at the top
-	DI using $inject to overcome issues during bundling and minification.
-	Wrapping members in init() method for controller activation promises. 

![6](https://cloud.githubusercontent.com/assets/10474169/11671695/c560afa8-9dcf-11e5-861f-92a96d44f70f.png)

**Service Structure**
-	Function declarations to abstract underline detail
-	Accessible members upfront at the top
-	Singleton object
-	SRP



