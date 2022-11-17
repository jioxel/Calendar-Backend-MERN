const {response}=require("express")
const bcrypt=require('bcryptjs')
const {validationResult}=require("express-validator");

const Usuario=require('../models/Usuario')
const crearUsuario=async(req,res = response)=>{
     const {email,password}=req.body
     try {
          let usuario=await Usuario.findOne({email});
          if( usuario ){
               return res.status(400).json({
                    ok:false,
                    msg:"Usuario regisrado"
               })
          }
          usuario= new Usuario( req.body)
          //encriptar contraseña
          const salt=bcrypt.genSaltSync();
          usuario.password=bcrypt.hashSync(password,salt)

          await usuario.save()


          res.status(201).json({
               ok:true,
               uid:usuario.id,
               name:usuario.name
          })

     } catch (error) {
          res.status(500).json({
               ok:false,
               msg:'Por favor hable con el administrador'
          })
     }
     
}
const loginUsuario=async(req,res=response)=>{

     
     const{email,password}=req.body;

     try {
          const usuario=await Usuario.findOne({email});
          if( !usuario ){
               return res.status(400).json({
                    ok:false,
                    msg:"Usuario no existe"
               })
          }

          //confirmar los password
          const validPassword=bcrypt.compareSync(password,usuario.password)
          if(!validPassword){
               return res.status(400).json({
                    ok:false,
                    msg:"contraseña invalida"
               })
          }

          //Generar el JSON web token (JWT)

          res.json({
               ok:true,
               uid:usuario.id,
               name:usuario.name
          })
     } catch (error) {
          res.status(500).json({
               ok:false,
               msg:'Por favor hable con el administrador'
          })
     }


     
}
const revalidarToken=(req,res =response)=>{
     res.json({
          ok:true,
          msg:"renew"
     })
}
module.exports={
     crearUsuario,
     loginUsuario,
     revalidarToken

}