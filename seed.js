const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const products = [
    {
        name: 'Classic White Tee',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        description: 'A timeless classic. 100% organic cotton for maximum comfort.',
        stock: 100,
    },
    {
        name: 'Denim Jacket',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&q=80&w=800',
        description: 'Premium denim jacket with a rugged finish. Perfect for layering.',
        stock: 50,
    },
    {
        name: 'Leather Boots',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1520639888713-7851186b1243?auto=format&fit=crop&q=80&w=800',
        description: 'Handcrafted leather boots with durable soles for everyday wear.',
        stock: 30,
    },
    {
        name: 'Sunglasses',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
        description: 'Premium polarized sunglasses with 100% UV protection.',
        stock: 75,
    },
    {
        name: 'Messenger Bag',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
        description: 'Durable and stylish messenger bag for your daily essentials.',
        stock: 40,
    },
    {
        name: 'Smart Watch',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
        description: 'Stay connected and track your fitness with this sleek smartwatch.',
        stock: 60,
    },
    {
        name: 'Bluetooth Headphones',
        price: 179.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
        description: 'Immersive sound quality with active noise cancellation technology.',
        stock: 80,
    },
    {
        name: 'Minimalist Wallet',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
        description: 'Slim leather wallet designed for those who value simplicity.',
        stock: 120,
    },
    {
        name: 'Canvas Sneakers',
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        description: 'Versatile canvas sneakers that pair well with any outfit.',
        stock: 90,
    },
    {
        name: 'Wool Beanie',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d7cae71?auto=format&fit=crop&q=80&w=800',
        description: 'Soft merino wool beanie to keep you warm during colder months.',
        stock: 150,
    },
];

const importData = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
