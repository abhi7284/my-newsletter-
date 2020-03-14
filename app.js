const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"))

app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  //-------------------------------------------

  res.sendFile(__dirname + "/signup.html");

});


//--------------------------------------------

app.post("/", function(req, res) {

  console.log(req.body)

  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;

  console.log(firstname, lastname, email);


  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstname,
        LNAME: lastname

      }
    }]
  };

  var jsonData=JSON.stringify(data);


  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/8d8dc0be1f",
    method: "POST",
    headers: {
      Authorization: "abhisek d93208e7fba89e3d3450fa5d3503cdd2-us4"


    },
    body:jsonData

  };


  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname+"/failure.html");
    } else {
      if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
      }else{
        res.sendfile(__dirname+"/failure.html");

      }
    }

  });

});



app.post("/failure",function(req,res){
  res.redirect("/");
})




//------------------------------------------------------

app.listen(process.env.PORT||3000, function() {
  console.log("Server is started ");
});



// Api key
// d93208e7fba89e3d3450fa5d3503cdd2-us4

// list id
//8d8dc0be1f
