// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
// router.get('/', function (req, res) {
//     res.json({
//         status: 'API Its Working',
//         message: 'Welcome to RESTHub crafted with love!'
//     });
// });

const assetsModal= require('../model/assets.js')

router.get('/',async(req,res)=>{

    try{
        const assets=await assetsModal.find()
        res.json(assets)
    }catch(err){
        console.log(err)
    }
})
router.get('/:id',async(req,res)=>{

    try{
        const assets=await assetsModal.findById(req.params.id)
        res.json(assets)
    }catch(err){

        console.log(err)
    }
})
router.post('/',async(req,res)=>{
 const assetData=new assetsModal({
     name:req.body.name,
     registration_date:req.body.registration_date
 })

 try{
const dbRes=await assetData.save()
res.json(dbRes)
 }catch(err){


 }
})
// Export API routes
module.exports = router;