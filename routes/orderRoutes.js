const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'restaurant.html'));
})

router.get('/re', (req, res) => {
   let tableNo= ""
   res.render("restaurant", {tableNo});
})

router.post("/create", async (req, res)=> {
    try {
       var myOrders = new Order(req.body);
       await myOrders.save()
       console.log(req.body);
       console.log('Item has been saved')
       res.redirect('/orderlist');
    } catch (error) {
        console.log(req.body);
       res.status(400).send("unable to save to database");
    }
 });

 router.get('/orderlist', async (req, res) => {
    try {
       let items = await Order.find()
       if (req.query.tableNo) {
            items = await Order.find({tableNo:req.query.tableNo})
       }
       console.log('Items have been retrieved')
       res.render('orderlist', { orders: items })
    } catch (err) {
       res.status(400).send("unable to find items in the database");
    }
 });

//  = =
  
 router.get("/deleteorder", async (req, res) => {
    try {
      if (req.query.tableNo) {
        await Order.deleteOne({ tableNo:req.query.tableNo });
        res.redirect("/orderlist");
      }
      res.redirect("/orderlist");
    } catch (error) {
      console.log("Could not delete the order");
    }
  });
  
//   router.get("/updateorder, (req, res) => {
//     if (req.query.tableNo) {
//       res.render("updateform", { tableNo:req.query.tableNo });
//     }
//     res.redirect("/orderlist");
//   });
  
  router.get("/updateorder", async (req, res) => {
    try {
       if(req.query.tableNo){
          let{tableNo} = req.query
         res.render("restaurant", {tableNo})
       }
      res.redirect("/orderlist");
    } catch (error) {
      console.log("Could not update the order");
      res.redirect("/orderlist");
    }
  });

module.exports = router;