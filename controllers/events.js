
const {response}=require('express')
const Evento= require('../models/Evento')


const getEventos=async(req,res=response)=>{
     res.json({
          ok:true,
          msg:"EI"
     })
}

const crearEvento=async(req,res=response)=>{

     const evento=new Evento(req.body);
     try {
          evento.user=req.uid;
          const eventoGuardado=await evento.save()

          res.status(200).json({
               ok:true,
               evento:eventoGuardado
          })
     } catch (error) {
          console.log(error)
          res.status(500).json({
               ok:false,
               msg:'Hable con el admin'
          })
     }
     res.json({
          ok:true,
          msg:"EI"
     })
}

const actualizarEvento=async(req,res=response)=>{
     res.json({
          ok:true,
          msg:"EI"
     })
}

const eliminarEvento = async(req,res=response)=>{
     res.json({
          ok:true,
          msg:"EI"
     })
}
module.exports={getEventos, crearEvento,eliminarEvento,actualizarEvento}