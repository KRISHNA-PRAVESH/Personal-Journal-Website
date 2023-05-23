
const express = require("express");
const ejs = require("ejs");
const _ = require('lodash');
const connectDB = require("./config/connectDB");
const Blog = require("./models/blogSchema");

require('dotenv').config()


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();


//connecting to mongodb atlas
connectDB();

//setting ejs as the view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
// Tells express to use the static files in the location public..
app.use(express.static("public"));

posts = {}
//home route
app.get("/",async(req,res)=>{
 
  //fetch journals from mongodb
  posts = await Blog.find();
  res.render("home",{content:homeStartingContent, dailyContent: posts});
});

//about page
app.get("/about",(req,res)=>{
  res.render("about",{abtContent:aboutContent});
});

//contact page
app.get("/contact",(req,res)=>{
  res.render("contact",{contactContent:contactContent});
});

//compose page
app.get("/compose",(req,res)=>{
  res.render("compose");
})

//compose new day
app.post("/save",async(req,res)=>{
  const {title, happenings} = req.body;
  
  const newBlog = await Blog.create(
    {
      title,
      happenings
    }
    );
 
  // console.log(newBlog);

  //redirecting back to home
  //status code 302 -- redirection
  //302 Found redirect status response code indicates that the resource requested has been temporarily moved to the URL given by the Location header
  res.redirect("/");
})

//Status code - 304: there is no need to retransmit the requested resources. It is an implicit redirection to a cached resource.02-Mar-2023

//Dynamic routing parameters
app.get("/posts/:day",(req,res)=>{
  // console.log(req.params); returns a js object of the parameters in the url

  posts.forEach((post)=>{
    // lowercase() from lodash ,returns a lower case string with no spl chars in-between
    // eg day-1 => day 1
    if(_.lowerCase(req.params.day) === _.lowerCase(post.title)){
      //redering the content of requested day...in a seperate page
      res.render("specific-day",{title: post.title, content:post.happenings,date: post.createdAt.toLocaleString()});
    }
  })

})
  














app.listen(8080, function() {
  console.log("Server started on port 8080");
});
