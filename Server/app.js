const express = require("express");
const port = 3000;
const app = express();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const spawn = require("child_process").spawn;
const fs = require("fs");
const axios = require('axios');
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "simsimpul2~",
  database: "Ponyo",
});
connection.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/contents", (req, res) => {
  
  fs.readFile("./database/contents.json", "utf8", (error, jsonFile) => {
    if (error) return console.log("json error!!!", error);
    const jsonData = JSON.parse(jsonFile);

    res.send(jsonData);
  });
});
app.post("/diet", (req, res) => {
  
  fs.readFile("./database/diet.json", "utf8", (error, jsonFile) => {
    if (error) return console.log("json error!!", error);
    const jsonData = JSON.parse(jsonFile);
    res.send(jsonData);
  });
});



app.post("/contents/add", (req, res) => {
  const data = req.body;
  console.log(data);
  
  fs.readFile("./database/contents.json", "utf8", (error, jsonFile) => {
    if (error) return console.log("json error!!!", error);
    const jsonData = JSON.parse(jsonFile);
    jsonData.contents.push(data);
    console.log(jsonData);
    fs.writeFile(
      "./database/contents.json",
      JSON.stringify(jsonData),
      function (err) {
        if (err) throw err;
        console.log("complete");
      }
    );
    res.send("success");
  });
});

app.post("/diet/add", (req, res) => {
  
  fs.readFile("./database/diet.json", (error, jsonFile) => {
    if (error) return console.log("json error!!", error);
    const jsonData = JSON.parse(jsonFile);
    jsonData.contents.push(req.body);
    console.log(jsonData);
    fs.writeFile(
      "./database/diet.json",
      JSON,
      stringify(jsonData),
      function (err) {
        if (err) throw err;
        console.log("complete");
      }
    );
    res.send("success");
  });
});

app.post("/save_db", (req, res) => {

  const query=req.body.query;
  var success = true;
  connection.query(
    query,(error,row,fields) => {
      if(error) {
        success=false;
        throw error;
      } 
      console.log('query execute success!',query);
      res.send({success:success,message:row});

    }
  )
})
  



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    try {
      fs.accessSync(`./database/image/${file.originalname.substring(0, 10)}`);
    } catch (e) {
      console.log(
        `./database/image/${file.originalname.substring(0, 10)}` +
          " 디렉토리 생성"
      );
      fs.mkdirSync(`./database/image/${file.originalname.substring(0, 10)}`);
    } finally {
      cb(null, `./database/image/${file.originalname.substring(0, 10)}`);
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}.jpeg`);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

app.post("/scoring",(req,res) => {
  console.log('scoring...');
  const result = spawn("python",["scoring.py",
req.body.sex,
req.body.age,
req.body.weight,
req.body.height,
req.body.exercise,
req.body.kcal,
req.body.carbo,
req.body.protein,
req.body.fat,
req.body.state,
req.body.blood,
7 //당화혈색소는 임시
]);
result.stdout.on('data',function (data){
  const ans = data.toString();
  console.log(ans);
  res.send(ans);
})

})

app.post("/diabet_predict",(req,res) => {
  console.log('diabet_predicting...')
  const result = spawn("python",["diabet_predict.py",
  req.body.sex,
  req.body.age,
  req.body.area,
  req.body.smoke,
  req.body.hypertension,
  req.body.family,
  req.body.waist
  ]);
  result.stdout.on('data',function (data){
    const ans = data.toString();
    console.log(ans);
    res.send(ans);
  })
})


app.post("/image/add", upload.single("img"), (req, res) => {
  /*여기에 사진 분석 후 클라이언트로 전송 */
  console.log('image detecting...');
  console.log(req.body);
  // const result = spawn("python", ["predict.py",req.file.path,req.file.filename]);

  // result.stdout.on('data',function(data){
  //     const box = data.toString();
  //     console.log(box);
  // })
  const cal=120;
  const protein=40;
  const fat = 20;
  const kcal = 600;
  const sugar=100;
  const nat=100;
  const col=100;
  const image='';
  res.send({
    success: true,
    cal:cal,
    protein:protein,
    fat:fat,
    kcal:kcal,
    sugar:sugar,
    nat:nat,
    col:col,
    image:image
  });
});

app.listen(port, () => {
  console.log("server is listening");
});
