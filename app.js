const express = require('express')
const mongoose =require('mongoose')
const url='mongodb://localhost/testdb'
const app=express()
const bodyParser = require('body-parser');
const userModel=require('./model/user.js');
const assetsModal= require('./model/assets.js')
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('./routes/verifyToken');
var findAllUsers = require('./middleware/findAllUsers');
var welcome = require('./middleware/welcome');
var moment = require('moment'); // require




mongoose.connect(url, {useNewUrlParser:true})
const con= mongoose.connection

app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.post('/register', async(req, res) => {
    const userM=new userModel({
        email:req.body.email,
        password:req.body.password
    })
    userM.password = await bcrypt.hashSync(req.body.password, 10);
    try{
        
   const dbRes=await userM.save()
   res.json(dbRes)
    }catch(err){
   
   
    }
});

app.post('/login', async(req, res) => {
    userModel.findOne({
            email: req.body.email
            }, (err, userModel) => {
                if (err) throw err;
                    if (!userModel) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
            }     else if (userModel) {
                    if (!userModel.comparePassword(req.body.password)) {  
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        } else {
            let tokenRes = jwt.sign({email:userModel.email}, 'ProTsys', {expiresIn: 1440});
                    res.json({token:tokenRes,
                    status:'Authenticated'});
                    }
               }
            });




});
//moment(new Date()).format("DD/MM/YYYY")

con.on('open',function(){
    console.log('connnected...')
})


var apiRoutes = express.Router();
apiRoutes.use(bodyParser.urlencoded({ extended: true }));
apiRoutes.use(bodyParser.json());
//route middleware to verify a token 
apiRoutes.use(verifyToken);
apiRoutes.get('/', welcome);
apiRoutes.get('/assets', async(req,res)=>{
    try{
        const assets=await assetsModal.find()
        res.json(assets)
    }catch(err){
        //console.log(err)
    }
});

apiRoutes.get('/assets/:id', async(req,res)=>{
    try{
        const assets=await assetsModal.findOne({id: req.params.id})
        res.json(assets)
    }catch(err){
        //console.log(err)
    }
});
apiRoutes.delete('/assets/:id', async(req,res)=>{
    
    try{
        const assets=await assetsModal.findByIdAndRemove(req.params.id)
        res.json(assets)
    }catch(err){
        //console.log(err)
    }
});

apiRoutes.delete('/assets/', async(req,res)=>{
    
    try{
        const assets=await assetsModal.deleteMany()
        res.json(assets)
    }catch(err){
        //console.log(err)
    }
});
apiRoutes.put('/assets/:id', async(req,res)=>{
    
    try{
        const assets=await assetsModal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        res.json(assets)
    }catch(err){
        //console.log(err)
    }
});
apiRoutes.post('/assets', async(req,res)=>{
    const assetData=new assetsModal({
        name:req.body.name,
        registration_date:moment(req.body.registration_date,["MM-DD-YYYY", "YYYY-MM-DD"]),
        status:true
    })
   
    console.log(assetData)
    try{
   const dbRes=await assetData.save()
   res.json(dbRes)
    }catch(err){
   
   
    }
});
app.use('/api', apiRoutes);


app.listen(9000,function(){
    console.log('Running on server')
})