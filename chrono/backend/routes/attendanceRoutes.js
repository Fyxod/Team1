const express = require("express");
const router = express.Router();

// sample route for testing i wanted to add i will code it later cuz im dead almost
router.get('/', (req, res) => {
  res.send('API is running...');
});
module.exports = router;
