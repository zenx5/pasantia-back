import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
import bodyParser from 'body-parser'
import { database } from './database/database.js';
import { 
    User, 
    Proyect,
    Entity
} from './database/Models.js';
import { 
    getAll,
    getUnique,
    create,
    update,
    destroy
 } from './methods.js';
import { generateData } from './database/mockup.js';
import { Op } from 'sequelize';

const app = express();
const router = express.Router();

router.get('/reset', async (req, res)=>{
    await database.sync({force:true})
    res.json({message: 'database reset'})
})
router.get('/generate', async (req, res)=>{
    res.json({message: 'data create', data: await generateData() })
})
router.get('/', async (req, res)=>{
    res.json({message: 'running'})
})


router.post('/login', async (req, res) => {
    const result = await User.findAll({
        where:{
            nickname: req.body.user
        }
    })

    if( result.length > 0 ){
        if( result[0].password == req.body.pass ){
            res.json({message:`Select Record id=${req.params.id}`, data:result, error: false})
        }else{
            res.json({message:`Incorrect Password`, data:[], error: true})
        }        
    }else{
        res.json({message:`User not exists`, data:[], error: true})
    }
})

router.get('/modules', async (req, res) => {
    let modules = [
        { label:'MIMAC', disabled:true },
        { label:'MACTOR', disabled:true },
        { label:'SMIC-PRO EXPERT', disabled:true },
        { label:'MORPHOL', disabled:true },
        { label:'MULTIPOL', disabled:true },
    ]

    const proyects = await Proyect.findAll()
    proyects.forEach( proyect => {
        if( proyect.module.includes('MIMAC') ){
            modules[0].disabled = false
        }
        if( proyect.module.includes('MACTOR') ){
            modules[1].disabled = false
        }
        if( proyect.module.includes('SMIC-PRO EXPERT') ){
            modules[2].disabled = false
        }
        if( proyect.module.includes('MORPHOL') ){
            modules[3].disabled = false
        }
        if( proyect.module.includes('MULTIPOL') ){
            modules[4].disabled = false
        }
    })

    res.json({message:`Modules avalaible`, data:modules, error: true})
})

router.get('/users', await getAll(User, { include: Proyect  }))
router.get('/users/:id', await getUnique(User, {include: Proyect}))
router.post('/users', await create(User))
router.put('/users/:id', await update(User))
router.delete('/users/:id', await destroy(User))

router.get('/proyects', await getAll(Proyect, {include: Entity }))
router.get('/proyects/:id', await getUnique(Proyect, {include: Entity }))
router.post('/proyects', await create(Proyect))
router.put('/proyects/:id', await update(Proyect))
router.delete('/proyects/:id', await destroy(Proyect))

router.get('/entities', await getAll(Entity, { include:Proyect }))
router.get('/entities/:id', await getUnique(Entity, { include:Proyect }))
router.get('/entities/p/:id', async (req, res) => {
    const options = {
        where:{
            ProyectId: req.params.id
        },
        include: Proyect
    }
    const result = await Entity.findAll( options )
    if( result.length > 0 ){
        res.json({message:`Select Record(s) of ProyectId=${req.params.id}`, data:result, error: false})
    }else{
        res.json({message:`Not Record(s) Selected`, data:[], error: true})
    }
})
router.post('/entities', await create(Entity))
router.put('/entities/:id', await update(Entity))
router.delete('/entities/:id', await destroy(Entity))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( morgan('dev') );
app.use( cors() )
app.use( router )

app.listen(process.env.PORT, ()=>console.log(`init in port ${process.env.PORT}`))



