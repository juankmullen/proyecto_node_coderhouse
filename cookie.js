const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session')


const app = express();

 app.use(cookieParser("coderhouse"))
 app.use(session({
    secret:'secreto',
    resave:true,
    saveUninitialized: true,
 }))

//sesiones

app.get('/privado',checkAuth,(req,res)=>{
    res.send('Logueado')
})

function checkAuth(req,res,next) 
{
    if(req.session?.user === 'jc' && req.session.admin)
    {
        return next()
    }
    
    return res.status(401).send('usted no está logueado')
}

app.get('/logout',(req,res)=>{

    req.session.destroy()

    if(error)
    {
        res.send({status : 'logout error'})
    }
   
    
})


app.get('/login',(req,res)=>{
    const {username,password} = req.query

    if(username !== 'jc' && password !== '12345')
        {
            return res.send('usuario y/o contraseña incorrecto')
        }
    else{
        console.log({username,password})
        req.session.user = username;
        req.session.admin = true;

        res.send('correcto')
    }
    
})


app.get('/contador',(req,res)=>{
    if(req.session.contador)
    {
        req.session.contador++;
        res.send('Entraste al sitio '+ req.session.contador)
    }else
    {
        req.session.contador = 1
        res.send('Bienvenido a Coderhouse ')

    }
})

 //cookie

app.get('/set',(req,res)=>{
    res.cookie('server','cookie desde express').send('Cookie set')
})

app.get('/set2',(req,res)=>{
    res.cookie('server','cookie desde express',{maxAge:30000}).send('Cookie set'); // tiempo de vida
})

app.get('/set3',(req,res)=>{
    res.cookie('server','cookie signed',{signed:true}).send('Cookie set signed'); // tiempo de vida
})

app.get('/get',(req,res)=>{
    res.send(req.cookies)
})

app.get('/get/signed',(req,res)=>{
    res.send(req.signedCookies)
})

app.get('/clearcookie',(req,res)=>{
    res.clearCookie('server').send('Eliminar Cookie')
})


 const server = app.listen(8080,()=>{
    console.log('corriendo server')
 })


