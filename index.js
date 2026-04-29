import express from "express";
import { error } from "node:console";
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use(
  "/fontawesome",
  express.static("node_modules/@fortawesome/fontawesome-free"),
);
let items = [];

app.get("/", (req, res) => {
  res.render("index.ejs");
});
let userauthorization = false;
function passwordCheck(req, res, next) {
  userauthorization = false;
  const id = "demo@gmail.com";
  const password = "1234";
  

  const gelenId = req.body["mail"];
  const gelenPassword = req.body["password"];

  if (
    (gelenId === id && gelenPassword === password) 
  ) {
    userauthorization = true;
  }
  next();
}

app.post("/submit", passwordCheck, (req, res) => {
  if (userauthorization) {
    res.render("home.ejs", { items: items });
  } else {
    res.render("index.ejs", { error: "id veya şifre hatalı" });
  }
});

//ekleme

app.post("/add", (req, res) => {
  const yeniItem = req.body.item;
  items.push(yeniItem);
  res.render("home.ejs", { items: items });
});

app.get("/delete/:item",(req,res)=>{
        const index =Number(req.params.index);
        
        items.splice(index,1);

        res.render("home.ejs",{items:items})
})

app.post("/logout",(req,res)=>{
    items=[];
    res.render("index.ejs")
})




app.listen(port, () => {
  console.log("sunucu çalıştırıldı.");
});
