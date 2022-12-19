const router = Require('express').router();

const apiRoutes = Require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => { res.status(404).send('Error... Check route.') });

Module.exports = router;

