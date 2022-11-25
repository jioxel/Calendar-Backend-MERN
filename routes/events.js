const {Router}=require('express');
const { check } = require('express-validator');
const router=Router()
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos }=require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
//obtener eventos


//todas las peticiones tienen que validarse por JWT
router.use(validarJWT); //midleware que se aplica a todas las peticiones que esten debaje de este

//obtener
router.get('/',getEventos);

//crear un nuevo evento
router.post(
     '/',
     [
          check('title','El titulo es requerido').not().isEmpty(),
          check('start','La fecha de inicio es requerida').custom(isDate),
          check('end','La fecha de finalizacion es requerido').custom(isDate),
          validarCampos
     ],
     crearEvento);

//actualizar evento
router.put('/:id',actualizarEvento)

//elimitar evento
router.delete('/:id',eliminarEvento)

module.exports=router;