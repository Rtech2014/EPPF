var Parse = require('parse/node');

Parse.initialize("34olOarYIJtsSy1YcuCdR4RFBPzKthQfAyotWjXP", "vvoqLVt7kMDwuxYliMuOJthEpMvRA3PVFdxC5izY");


var TestObject = Parse.Object.extend("fetch");

var testObject = new TestObject();


console.log("yay! it worked");


testObject.fetch({
  success: function(testObject) {
    // The object was refreshed successfully.
    for (var i = 0; i <100; i++)

    {
      //  testObject.set("value":i)

      setInterval(function() {


        testObject.save({value: i}).then(function(object) {

        }, 1000);
      });


    }
  },
  error: function(myObject, error) {
    // The object was not refreshed successfully.
    // error is a Parse.Error with an error code and message.
  }
});
