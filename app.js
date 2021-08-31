const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const router = require('./api');


// express app
const app = express();
app.use(router);

// connect the mongo DB
const dbURI = 'mongodb://netninja:test1234@cluster0-shard-00-00.6gvkt.mongodb.net:27017,cluster0-shard-00-01.6gvkt.mongodb.net:27017,cluster0-shard-00-02.6gvkt.mongodb.net:27017/note-tuts?ssl=true&replicaSet=atlas-res2yf-shard-0&authSource=admin&retryWrites=true&w=majority';
//'mongodb+srv://netninja:test1234@cluster0.6gvkt.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI , { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen( process.env.PORT || 3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine' , 'ejs');

// mongoose and mongo sandbox routes
app.get('/add-blog' , (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result)=> {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/all-blogs' , (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/single-blog' , (req, res) => {
    Blog.findById('612a23fbaf605f3be2d529ac')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        })
})


// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
// log info to console
app.use(morgan('dev'));

/* app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
}) */

// basic routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
    /*const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];*/

    res.render('index', { title: 'Home' , blogs});
})

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.render('about', { title: 'About' });
})

app.use('/blogs' , blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})