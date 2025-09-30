const express = require('express'); // import express
const app = express(); // call it to initialize app variable
const path = require('node:path');
//const index = requires('./routes/index.js');

//set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware 
app.use(express.urlencoded({ extended: true }));

/*{
app.get( '/', (req,res)=>{
    res.send('Hello world!');
} );

app.listen(3000, (error)=>{
    if(error){
        throw error;
    }
    console.log('my first express app');
});
}*/

let messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];


app.get('/', (req,res)=>{
    messages.forEach( (obj,index)=>{
        obj.id = index+1;
    } );

    res.render('index', {title:"Mini Messageboard", messages: messages})
});

app.get('/new', (req,res)=>{
    res.render('new');
});

app.post('/new', (req,res)=>{
    messages.push({ text: req.body.messageText, user: req.body.messageUser, added: new Date() });
    //res.render()
    res.redirect('/');
});

//get a single message
app.get('/:id',(req,res)=>{
    const reqId = parseInt(req.params.id);
    const [reqMessage] = messages.filter(obj => obj.id === reqId);
    
    res.render('single',{reqMessage});
});

//delete message
app.post('/:id', (req,res)=>{
    const reqId = parseInt(req.params.id);
    const deleteMessage = messages.filter(obj => obj.id !== reqId);
    messages = deleteMessage;
    res.redirect('/');
});

app.listen(4000,(err)=>{
    if(err){
        console.error(err);
    }
    else{
        console.log("My app running on port 3000");
    }
});