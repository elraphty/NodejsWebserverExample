
const express=require("express");
const hbs=require("hbs");
const fs=require("fs");
const port=process.env.PORT || 8080;

var app=express();


hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine','hbs');
app.use(express.static(__dirname+"/public"));

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=""+now +req.method + req.url+"";
  console.log(log);
  fs.appendFile("server.log",log +"\n",(err)=>{
 if(err){
   console.log(err).toString();
 }
  });
next();
});

//Middle ware code
// app.use((req,res,next)=>{
// res.render("maintenance.hbs");
// });

hbs.registerHelper("getCurrentYear",()=>{
return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text)=>{
 return text.toUpperCase();
});


app.get("/",(req,res) =>{
  res.render("home.hbs",{
  pageTitle:"Home Page",
  welcomeMessage:"Hello welcome to home page"
  });
});


app.get("/bad",(req,res)=>{
  res.send({
    name:"Hello",
    age:34
  });
});

app.get("/about",(req,res)=>{
  res.render("about.hbs",{
    pageTitle:"About Page",
  });
});

app.get("/portfolio",(req,res)=>{
  res.render("potfolio.hbs",{
    pageTitle:"Portfolio Page",
  });
});



app.listen(port,()=>{
  console.log("LISTENING @ port" + port);
});
