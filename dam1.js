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
var nxtdmpdcff,nxtdmtv;
//BOARD ON
var board = new five.Board();
var TestObject1 = Parse.Object.extend("DAMData001");
var testObject1 = new TestObject1();
var TestObject2 = Parse.Object.extend("DAMData002");
var testObject2 = new TestObject2();

var TestObjecttv1 = Parse.Object.extend("DAMDatatv001");
var testObjecttv1 = new TestObjecttv1();

var TestObjecttv2 = Parse.Object.extend("DAMDatatv002");
var testObjecttv2 = new TestObjecttv2();



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

            setInterval(function() {
              // Set how often to Emit data to Plotly
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
//testObject1.set("token", "1");

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
          var dischargewater=predctncff-threshold;
          var dischargewaterps=dischargewater/300;
          var query = new Parse.Query(testObject2);
          query.descending("createdAt");
          query.limit(1);
          query.include("post");
          query.include("post1");
          query.find({
          success: function(testObject2) {
              var post = testObject2[0].get("predctncff");
              var post1 = testObject2[0].get("threshold");
              console.log("token passing001");

               nxtdmpdcff=post;
               nxtdmtv = post1;
          //    console.log("token passing"+nxtdmpdcff);

            console.log(nxtdmpdcff);
            console.log(nxtdmtv);

          }

        });
        if(nxtdmpdcff + dischargewater > nxtdmtv)
        {
          console.log("...........................................................................................................");
          testObjecttv2.save({ token:"1",tokenv:dischargewater }).then(function(object) {
            console.log("yay! it worked");
          });


        }
        else {
          // realse();
        }

}
//console.log("eMNAKWEDFKJ");
var query1 = new Parse.Query(testObject1);
query1.descending("createdAt");
query1.limit(1);
query1.include("post");
query1.find({
success: function(testObjecttv1) {
  //console.log("THORA DA NAAAYE23");

        var post = testObjecttv1[0].get("tokenv");
        var post1 = testObjecttv1[0].get("token");
        var tkn=token;
        var tknvl = post1;
    //    console.log("THORA DA NAAAYE1JHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
//tkn==1;
console.log(tkn);
if(tkn==1)
{
  //console.log("THORA DA NAAAYE");
          if (tknvl+predctncff>threshold)
          {

                    //dw=tknvl+Waterlevel;
                    var dw=(tknvl+predctncff)-threshold;
                    var dws=dw/300;
                    var query = new Parse.Query(testObject2);
                    query.descending("createdAt");
                    query.limit(1);
                    query.include("post");
                    query.find({
                    success: function(testObject2) {
                        var post = testObject2[0].get("predctncff");
                        var post1 = testObject2[0].get("threshold");
                        var nxtdmpdcff=post;
                        var nxtdmtv = post1;
                      console.log(nxtdmpdcff);
                      console.log(nxtdmtv);
                      if(nxtdmpdcff + dw > nxtdmtv)
                      {
                      testObjecttv2.set("token", "1");
                      testObjecttv2.set("tokenv",dw);
                      testObjecttv2.save(null, {
                                    success: function(testObjecttv2) {
                                      // Execute any logic that should take place after the object is saved.
                                      alert('New object created with objectId: ' + gameScore.id);
                                    },
                                    error: function(testObjecttv2, error) {
                                      // Execute any logic that should take place if the save fails.
                                      // error is a Parse.Error with an error code and message.
                                      alert('Failed to create new object, with error code: ' + error.message);
                                    }
                                  });
                      }
                      else {
                        realse();
                      }
                    }
                  });

  }
  }
}
});
}

function realse(){


  var five = require("johnny-five"),
    board = new five.Board();

  board.on("ready", function() {
    var servo = new five.Servo({
      pin: 10,
      startAt: 90
    });
    var lap = 0;

    servo.sweep().on("sweep:full", function() {
      console.log("lap", ++lap);

      if (lap === 1) {
        this.sweep({
          range: [40, 140],
          step: 10
        });
      }

      if (lap === 2) {
        this.sweep({
          range: [60, 120],
          step: 5
        });
      }

      if (lap === 3) {
        this.sweep({
          range: [80, 100],
          step: 1
        });
      }

      if (lap === 5) {
        process.exit(0);
      }
    });
  });

}
