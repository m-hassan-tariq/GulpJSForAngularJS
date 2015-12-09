# Gulp.JS For AngularJS
Using Gulp.JS to specify units of work in angularJS

# Content is still under progress

**Core Feature of Gulp**
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

**Difference between Grunt and Gulp**

Gulp is more codish as compare to grunt which is more into configuration, so Gulp is more readable, easier to debug. Its stream based so used node more readily. 

![2](https://cloud.githubusercontent.com/assets/10474169/11699406/d05a0174-9e89-11e5-8748-75b5ad4bae43.png)

**Gulp Workflow**

- Fetch files to be modify
- Modify the files
- Create new files

![3](https://cloud.githubusercontent.com/assets/10474169/11700170/ea842c06-9e8d-11e5-93c3-c02add86dff4.png)

Since Gulp is stream based, so in pipeline architecture, diagram would be as follows

![4](https://cloud.githubusercontent.com/assets/10474169/11700250/57430c2c-9e8e-11e5-82cc-a6ff65e6b75f.png)

![5](https://cloud.githubusercontent.com/assets/10474169/11700307/b65be634-9e8e-11e5-970d-f3f304641a14.png)

**Gulp API**

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

1. gulp.task

gulp.task(taskName [, arary of dependencies], function)

**Logical Module Division**

![3](https://cloud.githubusercontent.com/assets/10474169/11671547/e6f240f6-9dce-11e5-9fed-78af550022d3.png)

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



