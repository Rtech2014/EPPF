var Parse = require('parse/node');

Parse.initialize("34olOarYIJtsSy1YcuCdR4RFBPzKthQfAyotWjXP", "vvoqLVt7kMDwuxYliMuOJthEpMvRA3PVFdxC5izY");


var TestObject = Parse.Object.extend("fetch");

var testObject = new TestObject();


for (var i = 0; i <100; i++)

{
//  testObject.set("value":i)
  testObject.save({value: i}).then(function(object) {
    alert("yay! it worked");
  });


}
