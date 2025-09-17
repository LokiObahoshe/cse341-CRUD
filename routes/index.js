const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Add "/pets" to the end of link to see pet list.');
});

router.use('/pets', require('./pets'));

module.exports = router;