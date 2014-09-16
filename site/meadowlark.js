var express = require('express');
var app = express();


var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

// static middleware
app.use(express.static(__dirname+'/public'));


var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know",
    "You will have a preasant surprise.",
    "whenever possible, keep it simple.",
];


// Routes
app.get('/', function(req, res){
    res.render('home');

//  res.type('text/plain');
//  res.send('Meadowlark Travels Home Page');
});
app.get('/about', function(req, res){
    var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about', {fortune: randomFortune});

//  res.type('text/plain');
//  res.send('Meadowlark Travel');
});

// 404 page
app.use(function(req, res){
    res.status(404);
    res.render('404');

//  res.type('text/plain');
//  res.status(404);
//  res.send('404 - Not Found');
});
// Error Page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');

//  res.type('text/plain');
//  res.status(500);
//  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
    console.log('Express started on 127.0.0.1:'+app.get('port')+'; press Ctrl+C to terminate.');
});