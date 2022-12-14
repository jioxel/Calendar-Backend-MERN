const {Router}=require('express')
const router=Router()
const {check}=require('express-validator')
const {validarCampos}=require('../middlewares/validar-campos')
const {validarJWT}=require('../middlewares/validar-jwt')
const {crearUsuario,loginUsuario,revalidarToken}=require('../controllers/auth')


router.post(
     '/new',
     [
          check('name','El nombre es obligatorio').not().isEmpty(),
          check('email','El email es obligatorio').isEmail(),
          check('password','El password es obligatorio y debe de ser > a 6 caracteres').isLength({min:6}),
          validarCampos
     ],
     crearUsuario)


router.post(
     '/',
     [
          check('email','El email es requerido').isEmail(),
          check('password','El password es requerido y > 6').isLength({min:6}),
          validarCampos
     ],
     loginUsuario)


router.get(
     '/renew',
     validarJWT,
     revalidarToken)

module.exports=router;