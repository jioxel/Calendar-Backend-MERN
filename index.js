const express=require('express');
require('dotenv').config()
const {dbConnection}=require('./database/config')
const cors=require('cors')

//creando servidor de express
const app=express();

//Base de datos
dbConnection()

//CORSasdasd 
app.use(cors())
// directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());


//Rutas
app.use('/api/auth',require('./routes/auth'))
/*

CRUD : Eventos
*/


//Escuchar peticiones
app.listen(process.env.PORT,()=>{
     console.log(`servidor corriendo en puerto ${process.env.PORT}`);
})