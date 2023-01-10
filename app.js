//jshint esversion:6
//"lodash": "^4.17.11"

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const loadash = require("loadsh");

const listOfContent =[]

const homeStartingContent = "The Bhagavad Gita is a poem written in the Sanskrit language.[98] Its 700 verses[94] are structured into several ancient Indian poetic meters, with the principal being the shloka (Anushtubh chanda). It has 18 chapters in total. [99] Each shloka consists of a couplet, thus the entire text consists of 1,400 lines. Each shloka has two quarter verses with exactly eight syllables. Each of these quarters is further arranged into two metrical feet of four syllables each.[98][note 10] The metered verse does not rhyme.[100] While the shloka is the principal meter in the Gita, it does deploy other elements of Sanskrit prosody.[101] At dramatic moments, it uses the tristubh meter found in the Vedas, where each line of the couplet has two quarter verses with exactly eleven syllables."
const aboutContent ="The Indian early medieval age, from 600 to 1200 CE, is defined by regional kingdoms and cultural diversity.[108] When Harsha of Kannauj, who ruled much of the Indo-Gangetic Plain from 606 to 647 CE, attempted to expand southwards, he was defeated by the Chalukya ruler of the Deccan.[109] When his successor attempted to expand eastwards, he was defeated by the Pala king of Bengal.[109] When the Chalukyas attempted to expand southwards, they were defeated by the Pallavas from farther south, who in turn were opposed by the Pandyas and the Cholas from still farther south.[109] No ruler of this period was able to create an empire and consistently control lands much beyond their core region.[108] During this time, pastoral peoples, whose land had been cleared to make way for the growing agricultural economy, were accommodated within caste society, as were new non-traditional ruling classes.[110] The caste system consequently began to show regional differences."
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

var lii = [homeStartingContent, aboutContent, contactContent]
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("home.ejs", {para : homeStartingContent, listOfContent : listOfContent})
})

app.get("/about", function(req,res){
  res.render("about.ejs", {para : aboutContent })
})

app.get("/contact", function(req,res){
  res.render("contact.ejs",{para : contactContent} )
})

app.get("/compose", function(req,res){
  res.render("compose.ejs")
})

app.post("/compose", function(req, res){
  const newRequest = req.body
  const requestObject ={
    "textInput" : newRequest.textInput,
    "message" : newRequest.message
  }
  listOfContent.push(requestObject)
  res.redirect("/")

})

app.get('/:temp', (req, res) => {
  const newParam = req.params.temp
  
  listOfContent.forEach(textInp => {
    if(loadash.lowerCase(textInp.textInput) === loadash.lowerCase(newParam)){
      console.log("match found22")
      res.render("post.ejs", {ele:textInp})
    }
  })
  
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
