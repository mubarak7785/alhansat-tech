const express=require("express")

const router= express.Router();

const Data=require("../models/data.model")

router.post("", async function (req, res) {
    try {
        const {title,description,status}=req.body;
        const date=new Date()
      const data = await Data.create({title,description,status,Date:date});
      return res.status(201).send(data);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

  router.get("", async function (req, res) {
    try {
      const data= await Data.find().lean().exec();
      return res.status(201).send(data);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

  router.delete("/:id",async(req,res)=>{
    try {
        const delitem=await Data.findByIdAndDelete(req.params.id);
        return res.status(200).send(delitem)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

  router.patch("/:id",async(req,res)=>{
    try {
      const itemId = req.params.id;
        const delitem=await Data.findByIdAndUpdate(itemId,req.body,{new:true});
        return res.status(200).send(delitem)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})
  
  module.exports = router;
  