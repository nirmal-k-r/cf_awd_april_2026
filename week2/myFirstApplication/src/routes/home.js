//router
const router=require('express').Router();

const Product=require('../models/product');

//home route
// router.get('/', (req, res) => {
//     res.send('Welcome to the home page!');
// });

router.get('/', async (req, res) => {

    products= await Product.find({}); //gets all products from db
    ctx={ 
        user: req.session.user || null,
        products: products
    };

    res.render('components/home/homepage', ctx);
});

router.get('/searchSuggestions', async (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        return res.json([]);
    }
    try {
        let items=[];
        const regex = new RegExp(keyword, 'i'); // Case-insensitive search
        const suggestions = await Product.find({ name: regex }).limit(5).select('name');
        for (suggestion in suggestions){
            items.push({name: suggestions[suggestion].name, link: `/product/${suggestions[suggestion]._id}`});
        }
        res.json(items);

    } catch (error) {
        console.error('Error fetching search suggestions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//about route
router.get('/about', async (req, res) => {
    ctx={
        'companyName': 'ShopMaster',
        'description': 'Your one-stop shop for all your needs!',
        user: req.session.user || null
    }
    res.render('components/home/about', ctx);
});


module.exports=router;