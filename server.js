const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const register=require('./controllers/register')
const knex = require('knex')
const profile=require('./controllers/profile')
const signin=require('./controllers/signin')
const image=require('./controllers/image')
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'face'
  }
});
const app=express();
app.use(bodyParser.json());
app.use(cors())


app.get('/',(req,res)=>{res.send('this is working') })
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req,res)=>register.handleRegister(req,res,db,bcrypt))
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})
app.listen(3001,()=>{
	console.log('app is running on port 3000');
})



/* 
/ --> res=this is working
/signin -->POST =success/fail
/register-->POST =user
/profile/:userId --> GET=user
/imge -->PUT -->user

*/