/** ROUTER INCLUSION */
const router = require('express').Router();

/** MODEL INCLUSION **/
const {Creature, Brand} = require("../models");

router.get("/profile", async (req,res) => {
    if(req.session.logged_in){
        try {
            const creatList = await Creature.findAll({
                include: Brand
            });

            if(!creatList){
                res.status(404).send("You don't have any creatures");
            } else {
                const userCreatures = creatList.map(creature=>{
                    return creature.get({plain:true});
                })
                console.log(userCreatures);
                const handleObj = {
                    user: req.session.logged_in,
                    username: req.session.username,
                    userCreatures,
                }
                res.render("collectionpage", handleObj );
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    } else {
      res.status(300).redirect('/');
    }
  });

  router.get("/pet-page", async (req,res) => {
    if(req.session.logged_in){
      res.status(200).render('petPage');
    }
  });


module.exports = router;