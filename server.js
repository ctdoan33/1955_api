var app=require("express")();
var bodyParser=require("body-parser");
app.use(bodyParser.json());

var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/1955_api");
var PersonSchema=new mongoose.Schema({
	name: {type: String, required: true}
});
mongoose.model("Person", PersonSchema);
var Person=mongoose.model("Person");

app.get("/", function(req, res){
	Person.find({}, function(err, persons){
		if(err){
			res.json("Error loading response");
		}else{
			res.json(persons);
		};
	});
});

app.get("/new/:name", function(req, res){
	person=new Person({name: req.params.name});
	person.save(function(err){
		if(err){
			res.json("Error saving new person");
		}else{
			res.redirect("/");
		}
	})
})

app.get("/remove/:name", function(req, res){
	Person.remove({name: req.params.name}, function(err){
		if(err){
			res.json("Error removing person");
		}else{
			res.redirect("/");
		}
	})
})

app.get("/:name", function(req, res){
	Person.findOne({name: req.params.name}, function(err, person){
		if(err){
			res.json("Error loading response")
		}else{
			res.json(person);
		}
	})
})

app.listen(8000, function(){
    console.log("listening on port 8000");
});