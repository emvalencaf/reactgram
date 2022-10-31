const express = require("express");
const router = express();


// users routes
router.use('/api/users', require('./user/User.routes'));

// photos routes
router.use('/api/photos', require('./photo/Photo.routes'));

// test route
router.get("/", (req, res) => {

    res.send('API working!!');

});


module.exports = router;