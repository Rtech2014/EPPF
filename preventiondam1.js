var five = require("johnny-five");
var Parse = require('parse/node');
Parse.initialize("34olOarYIJtsSy1YcuCdR4RFBPzKthQfAyotWjXP", "vvoqLVt7kMDwuxYliMuOJthEpMvRA3PVFdxC5izY");


var dam1 = new Parse.Object.extend("DAMData1");
var prevdam1 = new dam1();
var dam2 = new Parse.Object.extend("DamData2");
var prevdam2 = new dam2();
var dam3 = new Parse.Object.extend("DamData3");
var alldamthreshhold = new Parse.Object.extend("Damthresholds");
var damsthrsh = new alldamthreshhold();
var query1 = new Query(dam1);
var query2 = new Query(dam2);
var query3 = new Query(dam3);
var query4 = new Query(damsthrsh);
var a,b,c,d,e,f,dw,dw_s;
setInterval(function(){
  query1.descending("createdAt");

    // Only retrieve the last ten
    query1.limit(10);

    // Include the post data with each comment
    query1.include("post");

    query1.find({
      success: function(dam1) {
        // Comments now contains the last ten comments, and the "post" field
        // has been populated. For example:
        for (var i = 0; i < dam1.length; i++) {
          // This does not require a network access.
          var post = comments[i].get("predcff1");
           a = post;
        }
      }
    });
    query2.descending("createdAt");

      // Only retrieve the last ten
      query2.limit(10);

      // Include the post data with each comment
      query2.include("post");

      query2.find({
        success: function(dam2) {
          // Comments now contains the last ten comments, and the "post" field
          // has been populated. For example:
          for (var i = 0; i < dam2.length; i++) {
            // This does not require a network access.
            var post3 = comments[i].get("predcff2");
             b = post3;
          }
        }
      });
      query3.descending("createdAt");
        // Only retrieve the last ten
        query3.limit(10);
        // Include the post data with each comment
        query3.include("post");
        query3.find({
          success: function(dam3) {
            // Comments now contains the last ten comments, and the "post" field
            // has been populated. For example:
            for (var i = 0; i < dam3.length; i++) {
              // This does not require a network access.
              var post3 = comments[i].get("predcff3");
               c = post3;
            }
          }
        });
        query4.descending("createdAt");
          // Only retrieve the last ten
          query4.limit(10);
          // Include the post data with each comment
          query4.include("post");
          query4.find({
            success: function(damsthrsh) {
              // Comments now contains the last ten comments, and the "post" field
              // has been populated. For example:
              for (var i = 0; i < dam1.length; i++) {
                // This does not require a network access.
                var thr1 = comments[i].get("thresholddam1");
                var thr2 = comments[i].get("thresholddam2");
                var thr3 = comments[i].get("thresholddam3");
                d = thr1;
                e = thr2;
                f = thr3;
                }
            }
          });
          call();
},2000);


function call() {
  if(a > d)
      {
          ds = a - d;
          dw_s = ds/1200;
          if (b + ds > e) {
                if (c > f) {
                  
                }
          }

      }
}
