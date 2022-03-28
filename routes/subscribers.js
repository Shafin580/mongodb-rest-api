const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

//Getting All
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.send(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Getting One
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});
//Creating One
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscriberToChannel: req.body.subscriberToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Updating One
router.patch("/:id", getSubscriber, (req, res) => {});
//Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
    try{
        await res.subscriber.remove();
        res.json({message: "Deleted subscriber!"});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});

async function getSubscriber(req, res, next){
    let subscriber;
    try{
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null){
            return res.status(404).json({ message: "Can not find subscriber" });
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }

    res.subscriber = subscriber;
    next();
}

module.exports = router;
