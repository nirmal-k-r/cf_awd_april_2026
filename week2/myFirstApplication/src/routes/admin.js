//router
const router=require('express').Router();
const User=require('../models/user');
const Product=require('../models/product');

//administration dashboard route

router.get('/', async (req, res) => {
    //RBAC guard condition
    if (!(req.session.user && req.session.user.role == 'admin')) {
        res.redirect('/auth');
        return;
    }
    //get all products
    products = await Product.find({});

    ctx={products:products, 
    user: req.session.user || null
    };
    res.render('components/admin/dash', ctx);
});

router.post('/create-product', async (req, res) => {
     //RBAC guard condition
    if (!(req.session.user && req.session.user.role == 'admin')) {
        res.redirect('/auth');
        return;
    }
    try {
        name= req.body.name;
        description= req.body.description;
        price= req.body.price;
        stock= req.body.stock;
        image= req.body.image;
        category= req.body.category;

        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            category,
            image
        });
        await newProduct.save();
        res.redirect('/admin');
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Internal Server Error');
    }
});

//delete product route
router.get('/delete-product/:id', async (req, res) => {
     //RBAC guard condition
    if (!(req.session.user && req.session.user.role == 'admin')) {
        res.redirect('/auth');
        return;
    }
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        res.redirect('/admin');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Internal Server Error');
    }
});

//view edit product page route
router.get('/edit-product/:id', async (req, res) => {
     //RBAC guard condition
    if (!(req.session.user && req.session.user.role == 'admin')) {
        res.redirect('/auth');
        return;
    }
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        ctx={product:product, 
            user: req.session.user || null
        };
        res.render('components/admin/editProduct', ctx);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
});

//update product route
router.post('/update-product/:id', async (req, res) => {
     //RBAC guard condition
    if (!(req.session.user && req.session.user.role == 'admin')) {
        res.redirect('/auth');
        return;
    }
    try {
        const productId = req.params.id;
        name= req.body.name;
        description= req.body.description;
        price= req.body.price;
        stock= req.body.stock;
        image= req.body.image;
        category= req.body.category;
        
        await Product.findByIdAndUpdate(productId, {
            name,
            description,
            price,
            stock,
            category,
            image
        });
        res.redirect('/admin');
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Internal Server Error');
    }
});
        

module.exports=router;