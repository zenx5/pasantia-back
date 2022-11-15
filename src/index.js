import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
import bodyParser from 'body-parser'
import { database } from './database/database.js';
import { 
    User, 
    Proyect,
    Module,
    Entity, 
    Feature
} from './database/Models.js';
import { 
    getAll,
    getUnique,
    create,
    update,
    destroy
 } from './methods.js';
import { generateData } from './database/mockup.js';

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


router.get('/users', await getAll(User, {include: Proyect}))
router.get('/users/:id', await getUnique(User, {include: Proyect}))
router.post('/users', await create(User))
router.put('/users/:id', await update(User))
router.delete('/users/:id', await destroy(User))

router.get('/proyects', await getAll(Proyect, {include: [User, Module, Entity]}))
router.get('/proyects/:id', await getUnique(Proyect, {include: [User, Module, Entity]}))
router.post('/proyects', await create(Proyect))
router.put('/proyects/:id', await update(Proyect))
router.delete('/proyects/:id', await destroy(Proyect))

router.get('/modules', await getAll(Module, {include: [Proyect]}))
router.get('/modules/:id', await getUnique(Module, {include: [Proyect]}))
router.post('/modules', await create(Module))
router.put('/modules/:id', await update(Module))
router.delete('/modules/:id', await destroy(Module))

router.get('/entities', await getAll(Entity, { include:Proyect }))
router.get('/entities/:id', await getUnique(Entity, { include:Proyect }))
router.post('/entities', await create(Entity))
router.put('/entities/:id', await update(Entity))
router.delete('/entities/:id', await destroy(Entity))

router.get('/features', await getAll(Feature))
router.get('/features/:id', await getUnique(Feature ))
router.post('/features', await create(Feature))
router.put('/features/:id', await update(Feature))
router.delete('/features/:id', await destroy(Feature))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( morgan('dev') );
app.use( cors() )
app.use( router )

app.listen(5000, ()=>console.log('init'))



