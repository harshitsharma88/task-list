require('dotenv').config();
PORT=process.env.PORT;
const express= require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
const dbConn= require('./util/database');


const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.text());

app.use(express.static('public'));


// Routes
const userRoute=require('./routes/userRoutes')
const tasksRoute=require('./routes/tasksRoutes');


app.use('/',userRoute);
app.use('/user',userRoute);
app.use('/task',tasksRoute);

dbConn()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Started on 4000`);
    })
})
.catch((error)=>{
    console.log(error);
})





