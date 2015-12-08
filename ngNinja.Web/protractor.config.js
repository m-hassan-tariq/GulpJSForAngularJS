// An example configuration file. 
exports.config = {
    // The address of a running selenium server. 

    // The file path to the selenium server jar () 
    seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar',

    chromeDriver: './node_modules/protractor/selenium/chromedriver.exe',

    //seleniumAddress: 'http://localhost:4444/wd/hub',
    
    // Capabilities to be passed to the webdriver instance. 

    capabilities: {
        'browserName': 'chrome'
    }, 
    
    //multiCapabilities: [{
    //        'browserName': 'chrome'
    //    }, {
    //        'browserName': 'firefox'
    //    }],
    
    // Spec patterns are relative to the current working directly when 
    // protractor is called. 
    specs: ['./protractor_test/customConfig.js', './protractor_test/menu.js', './protractor_test/homePage.js', './protractor_test/candidatePage.js'],
    
    // Options to be passed to Jasmine-node. 
    jasmineNodeOpts: {
        showColors: true, 
        defaultTimeoutInterval: 30000
    }
};



