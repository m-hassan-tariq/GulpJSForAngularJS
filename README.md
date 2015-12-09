# Gulp.JS For AngularJS
Using Gulp.JS to specify units of work in angularJS

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

**Workflow using Gulp.js**

![1](https://cloud.githubusercontent.com/assets/10474169/11671501/78512d06-9dce-11e5-85be-c8d904f90f21.png)

**Module Directory Structure**

![2](https://cloud.githubusercontent.com/assets/10474169/11671502/785263e2-9dce-11e5-84cb-ca920a56cf53.png)

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



