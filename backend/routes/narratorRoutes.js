const express=require("express");

const router=express.Router();

const {getNarration}=require("../controllers/narratorController");

router.post("/narrate", getNarration);

module.exports=router;