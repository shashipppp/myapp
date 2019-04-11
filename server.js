const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const api = require('./server/router/api');

const port = 3000;

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'images/card');
    },
    filename: (req,file,cb)=>{
        let isoDate = new Date().toISOString().replace(/:/g,'-').split('.')
        cb(null,`${isoDate[0]}-${file.originalname}`);
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype==='image/png'||file.mimetype==='image/jpeg'||file.mimetype==='image/jpg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(express.static(path.join(__dirname,'dist')));
app.use('/card_image',express.static(path.join(__dirname,'images/card')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', api);

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'dist/myapp/index.html'));
});

app.listen(port, function(){
console.log('sever is running on local host: '+ port );
});