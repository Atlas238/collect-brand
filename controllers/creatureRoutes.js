/** ROUTER INCLUSION */
const router = require('express').Router();

/** MODEL INCLUSION **/
const { Creature, Brand, CareStats } = require("../models");


router.get("/creature", async (req,res) => {
    if(req.session.logged_in){
        res.status(200).render('creature');
    }
});

module.exports = router;