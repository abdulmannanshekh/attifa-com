/*
==============================================================================
    প্রজেক্ট: আত-তিফা চিকিৎসালয় - অনলাইন শপ
    ফাইল: index.js (অ্যাপ্লিকেশন এন্ট্রি পয়েন্ট)
    বর্ণনা: এটি অ্যাপ্লিকেশনের মূল ফাইল যা সার্ভার শুরু করে,
             ডেটাবেস সংযোগ স্থাপন করে এবং মিডলওয়্যার ও রুট লোড করে।
    সংস্করণ: 1.1 (রাউট সংযুক্ত করা হয়েছে)
==============================================================================
*/

// কোর মডিউল এবং লাইব্রেরি ইমপোর্ট
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import 'colors'; // কালার প্যাকেজ ইম্পোর্ট

// আমাদের নিজস্ব মডিউল ইমপোর্ট
import connectDB from './config/database.js'; // ডেটাবেস সংযোগকারী ফাংশন
import productRoutes from './app/routes/productRoutes.js'; // পণ্যের রুট
// import userRoutes from './app/routes/userRoutes.js'; // ব্যবহারকারীর রুট (ভবিষ্যতে যুক্ত হবে)

// .env ফাইল থেকে ভ্যারিয়েবল লোড করার জন্য dotenv কনফিগার করা
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// ডেটাবেস সংযোগ স্থাপন
connectDB();

// Express অ্যাপ ইনিশিয়ালাইজ করা
const app = express();

// ------------------- মিডলওয়্যার (Middleware) সেটআপ -------------------

// 1. JSON এবং URL-encoded ডেটা পার্স করার জন্য মিডলওয়্যার
app.use(express.json()); // JSON বডি পার্স করার জন্য
app.use(express.urlencoded({ extended: true })); // ফর্ম ডেটা পার্স করার জন্য

// 2. CORS (Cross-Origin Resource Sharing) এনাবল করা
app.use(cors());

// 3. HTTP রিকোয়েস্ট লগ করার জন্য (ডেভেলপমেন্টের সময় খুব উপকারী)
if (process.env.APP_ENV === 'development' || process.env.APP_ENV === 'local') {
    app.use(morgan('dev'));
}

// 4. স্ট্যাটিক ফাইল (CSS, JS, Images) পরিবেশন করার জন্য 'public' ফোল্ডার নির্দিষ্ট করা
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// ------------------- টেমপ্লেটিং ইঞ্জিন সেটআপ (EJS) -------------------
// আপাতত API-ভিত্তিক হওয়ায় এটি কমেন্ট করা হলো। ফ্রন্টএন্ড রেন্ডারিং এর সময় ব্যবহার করা যাবে।
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'src/app/views'));


// ------------------- অ্যাপ্লিকেশন রুট (Application Routes) -------------------

// প্রধান API রুট
app.get('/api', (req, res) => {
    res.json({ message: 'আত-তিফা চিকিৎসালয় API-তে স্বাগতম!' });
});

// প্রোডাক্ট সম্পর্কিত সকল রুট '/api/products' প্রিফিক্সের সাথে সংযুক্ত করা হলো
app.use('/api/products', productRoutes);


// ------------------- এরর হ্যান্ডলিং মিডলওয়্যার -------------------

// 404 Not Found এরর হ্যান্ডলার
app.use((req, res, next) => {
    const error = new Error(`পাথ পাওয়া যায়নি - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// সাধারণ এরর হ্যান্ডলার
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: (process.env.APP_ENV === 'production') ? null : err.stack,
    });
});


// ------------------- সার্ভার চালু করা -------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`সার্ভার '${process.env.APP_ENV}' মোডে ${PORT} পোর্টে চলছে...`.yellow.bold);
});