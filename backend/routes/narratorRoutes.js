const express = require("express");

const router = express.Router();

const { getNarration } = require("../controllers/narratorController");

router.get("/test", (req, res) => {
    res.json({
        message: "Narrator API working"
    });
});

router.post("/narrate", getNarration);

module.exports = router;