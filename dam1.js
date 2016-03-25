var five = require("johnny-five");
var Parse = require('parse/node');
Parse.initialize("34olOarYIJtsSy1YcuCdR4RFBPzKthQfAyotWjXP", "vvoqLVt7kMDwuxYliMuOJthEpMvRA3PVFdxC5izY");
var Stream = require('stream');
var flow_stream = new Stream();
var l=0.40,w=0.25,h=0.25;
var waterlevel,rainwater,waterflow;
var threshold=17;
Parse.initialize("34olOarYIJtsSy1YcuCdR4RFBPzKthQfAyotWjXP", "vvoqLVt7kMDwuxYliMuOJthEpMvRA3PVFdxC5izY");
var pulses = 0;
var lastFlowRateTimer = 0;
var volume;

//BOARD ON
var board = new five.Board();
var TestObject1 = Parse.Object.extend("DAMData1");
var testObject1 = new TestObject1();
var TestObject1 = Parse.Object.extend("DAMData2");
var testObject2 = new TestObject2();




board.on("ready", function() {
        var proximity = new five.Proximity({
          controller: "HCSR04",
          pin: "11",
          freq: 1000
        });




//ULTASONIC


        proximity.on("data", function() {

          console.log("Proximity: ");
          console.log("  cm  : ", this.cm);

             waterlevel=this.cm;

        });





//WATER LEVEL

             var sensor = new five.Sensor({
               pin: "A0",
               freq: 1000
             });

              // Scale the sensor's data from 0-1023 to 0-10 and log changes
              sensor.scale(0, 5).on("data", function() {
                rainwater=this.value;
                rainwater = rainwater/1000;
                console.log("Waterlevel");
                console.log(rainwater);
            });




//WATERFLOW


            this.pinMode(2, five.Pin.INPUT);
            lastFlowPinState = 0;

            // Check Digital Pin to see if theres a change
            var x = this.digitalRead(2, function(value) {
              // send the pin status to flowSignal helper
              flowSignal(value);
            });

            // Set how often to Emit data to Plotly
            setInterval(function() {
              var litres = pulses;
              litres = litres * 60/7.5;
              litres = litres / 60;
              litres = litres /60;
              console.log("WATERFLOW");
              console.log(litres);
              waterflow=litres;
              pred();
              pulses = 0;
            }, 1000);
});


function flowSignal (value) {
      pulses ++;
      lastFlowRateTimer ++;
    flowrate = 1000.0;
    flowrate /= lastFlowRateTimer;
    lastFlowRateTimer = 0;

}







function pred(){

volume=l*w*(h-waterlevel/100);
var currentwaterlevel = volume * 1000;
predctn=(rainwater+waterflow)*300;
var predctncff=predctn+currentwaterlevel;
console.log(predctncff);

var testObject1 = new TestObject1();

testObject1.set("waterlevel", waterlevel);
testObject1.set("rainwater",rainwater);
testObject1.set("waterflow", waterflow);
testObject1.set("predctncff", predctncff);
testObject1.save(null, {
  success: function(testObject1) {
    // Execute any logic that should take place after the object is saved.
console.log(waterlevel);
console.log(rainwater);
console.log(waterflow);
console.log(predctncff);
    alert('New object created with objectId: ' + testObject.id);
  },
  error: function(testObject1, error) {

    alert('Failed to create new object, with error code: ' + error.message);
  }
});


if (predctncff>=threshold)
{
  var dischargewater=tdl-threshold;
  var dischargewaterps=dischargewater/300;
  var query = new Parse.Query(testObject1);
  query.descending("createdAt");
  query.limit(1);
  query.include("post");
  query.find({
  success: function(testObject1) {
      var post = testObject2[0].get("predctncff");
      var post1 = testObject2[0].get("threshold");
      var nxtdmpdcff=post;
      var nxtdmtv = post1;
    console.log(nxtdmpdcff);
    console.log(nxtdmtv);
    if(nxtdmpdcff + dw > nxtdmtv)
    {
    testObject2.set("token", "1");
    testObject2.set("tokenv",dw);
    }
    else {
      realse();
    }
  }
});

}


var query = new Parse.Query(testObject1);
query.descending("createdAt");
query.limit(1);
query.include("post");
query.find({
success: function(testObject1) {
        var post = testObject1[0].get("tokenv");
        var post1 = testObject1[0].get("token");
        var tkn=token;
        var tknvl = post1;

if(tkn==1)
{
  if (tknvl+predctncff>threshold)
  {
    dw=tknvl+Waterlevel;
    var dw=tdl-threshold;
    var dws=dw/300;
    var query = new Parse.Query(testObject1);
    query.descending("createdAt");
    query.limit(1);
    query.include("post");
    query.find({
    success: function(testObject1) {
        var post = testObject2[0].get("predctncff");
        var post1 = testObject2[0].get("threshold");
        var nxtdmpdcff=post;
        var nxtdmtv = post1;
      console.log(nxtdmpdcff);
      console.log(nxtdmtv);
      if(nxtdmpdcff + dw > nxtdmtv)
      {
      testObject2.set("token", "1");
      testObject2.set("tokenv",dw);
      }
      else {
        realse();
      }
    }
  });

  }


}

 }
