
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const ld  = require("lodash");

const homeStartingContent = "Use /compose to start writing your blog.";
const aboutContent = "I am a under graduate student pursuing Bachelor's of Computer Applications from Delhi Technical Campus.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


var posts =[];





app.get("/",(req,res)=>{
  res.render("home",{
    homeHeading : homeStartingContent,
    posts : posts
  });
})

app.get("/about",(req,res)=>{
  res.render("about",{aboutHeading : aboutContent});
})
app.get("/contact",(req,res)=>{
  res.render("contact",{contactHeading : contactContent});
})
app.get("/compose",(req,res)=>{
  res.render("compose");
})

app.get("/posts/:postName",(req,res)=>{

  const requestedTitle =  ld.lowerCase(req.params.postName);

  posts.forEach(function(post){
    let storedTitle = ld.lowerCase(post.title);

    if(storedTitle ===requestedTitle){
      res.render("post",{title:post.title, content : post.content});
    } else{
      console.log("Match not found");
    }
  });

});
app.post("/compose",(req,res)=>{
  const post ={
    title : req.body.postTitle,
    content : req.body.postBody
  }
  posts.push(post);
  res.redirect("/")
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
