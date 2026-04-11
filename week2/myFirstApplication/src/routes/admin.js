//router
const router=require('express').Router();

//administration dashboard route
router.get('/', (req, res) => {
    res.send('Welcome to the admin dashboard!');
});

module.exports=router;