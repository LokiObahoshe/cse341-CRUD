const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Add "/pets" to the end of link to see pet list.');
});

router.use('/pets', require('./pets'));
router.use('/owners', require('./owners'));

module.exports = router;