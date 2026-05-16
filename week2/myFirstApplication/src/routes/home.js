//router
const router=require('express').Router();

const Product=require('../models/product');

//home route
// router.get('/', (req, res) => {
//     res.send('Welcome to the home page!');
// });

router.get('/', async (req, res) => {

    //check if keyword is present in query
    const keyword = req.query.keyword;
    let products;
    if (keyword) {
        const regex = new RegExp(keyword, 'i'); // Case-insensitive search
        products = await Product.find({ name: regex }); //gets products matching keyword from db
    } else {
        products = await Product.find({}); //gets all products from db
    }

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
        console.log(items);
        res.json(items);

    } catch (error) {
        console.error('Error fetching search suggestions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/product/:id', async (req, res) => {
    const productId = req.params.id; //extract request parameter
    try {
        const product = await Product.findById(productId); 
        if (!product) {
            return res.status(404).send('Product not found');
        }
        ctx={
            user: req.session.user || null,
            product: product
        }
        res.render('components/home/productDetails', ctx);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Internal Server Error');
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

//add to cart route
router.get('/addToCart', async (req, res) => {
    productId=req.query.productId;
    quantity=req.query.quantity;

    if (!req.session.cart){
        req.session.cart={};
    }

    if (productId in req.session.cart){
        req.session.cart[productId]=req.session.cart[productId]+quantity;
    }else{
        req.session.cart[productId]=quantity;
    }

    res.json({message: 'success'});
});

//delete from cart route
router.get('/delete-from-cart', async (req, res) => {
    productId=req.query.productId;
    
    if (req.session.cart && productId in req.session.cart){
        delete req.session.cart[productId];
    }
    res.json({message: 'success'});
});

//update cart route
router.get('/update-cart', async (req, res) => {
    productId=req.query.productId;
    quantity=req.query.quantity;

    if (req.session.cart && productId in req.session.cart){
        req.session.cart[productId]=quantity;
    }
    res.json({message: 'success'});
});


router.get('/cart', async (req, res) => {
    cart=req.session.cart || {};
    productIds=Object.keys(cart);
    products=await Product.find({_id: {$in: productIds}}); //fetches products whose ids are in productIds array
    
    cartDetails=[];
    for (cartItem in cart){
        product=await Product.findOne({_id: cartItem});
        cartDetails.push({productId: cartItem.productId, product: product, quantity: cart[cartItem]});
    }

    ctx={
        user: req.session.user || null,
        cart: cart,
        cartDetails: cartDetails
    };

    console.log(cartDetails);

    res.render('components/home/cart', ctx);
});

module.exports=router;