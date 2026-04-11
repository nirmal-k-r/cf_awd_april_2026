//router
const router=require('express').Router();

//home route
// router.get('/', (req, res) => {
//     res.send('Welcome to the home page!');
// });

router.get('/', (req, res) => {
    ctx={};
    res.render('components/home/homepage', ctx);
});


//about route
router.get('/about', (req, res) => {
    ctx={
        'companyName': 'ShopMaster',
        'description': 'Your one-stop shop for all your needs!'
    }
    res.render('components/home/about', ctx);
});


module.exports=router;