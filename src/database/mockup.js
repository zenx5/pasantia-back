import { 
    User, 
    Proyect, 
    Module, 
    Entity,
    Feature 
} from './Models.js';

export const generateData = async () => {
    /*USERS*/
    const admin = User.build( {
        nickname: `admin`,
        firstname: 'Octavio',
        lastname: 'Martinez',
        email:  `admin@mail.com`,
        password: 'admin',
        type: 'administrador'
    } )

    let users = []
    users.push(await admin.save())
    for(let index = 0; index < 4; index++ ){
        const firstname = ['jose', 'juan', 'adrian', 'maria', 'leo','ana','pedro'][Math.floor(Math.random()*7)]
        const lastname = ['perez', 'mañez', 'villaroel', 'martinez', 'carpio','morales','rojas'][Math.floor(Math.random()*7)]
        const type = ['estudiante', 'profesor', 'instituto'][Math.floor(Math.random()*3)]
        const record = User.build( {
            nickname: `user${index}`,
            firstname: firstname,
            lastname: lastname,
            email:  `${firstname}_${lastname}@mail.com`,
            password: '12345',
            type: type
        } )
        users.push( await record.save() )
    }
    

    /*PROYECTS*/
    const numberProyects = Math.floor(Math.random()*10)+10
    let proyects = []
    for(let index = 0; index < numberProyects; index++ ){
    //proyects = proyects.map( async (proyect, index) => {
        const id = getRandomElement(users).id
        const record = Proyect.build( {
            name:`Proyect${id} ${index}`,
            UserId: id
        } )
         proyects.push( await record.save() )
    //})
    }
    
    /*MODULES*/
    let modules = []
    for(let index = 0; index < 5; index++ ){
        const record = Module.build( {
            name:['MIMAC', 'MACTOR', 'SMIC-PRO EXPERT', 'MORPHOL', 'MULTIPOL'][index]
        } )
        modules.push( await record.save() )    
    }

    let mix = []
    modules.forEach( module => {
        let currentProyect = getRandomElement(proyects)
        module.addProyect( currentProyect )
        mix.push({
            name: module.name,
            id: currentProyect.id
        })
    })

    

    /*Entities*/
    const typeEntity = ['variable', 'actor']
    const numberEntities = Math.floor(Math.random()*50)+20
    let entities = []
    for(let index = 0; index < numberEntities; index++ ){
        const type = typeEntity[ Math.floor(Math.random()*typeEntity.length)]
        
        let mixFiltered = [{id:-1}]
        
        if( type==='variable') mixFiltered = mix.filter( element => element.name === 'MIMAC')
        if( type==='actor') mixFiltered = mix.filter( element => element.name === 'MACTOR')
        
        const record = Entity.build( {
            name:`Entity ${type} ${index}`,
            description: `This is an entity of type ${type}`,
            type: type,
            ProyectId: mixFiltered[Math.floor(Math.random()*mixFiltered.length)].id
        } )
        entities.push( await record.save() )
    }

    /*Features*/
    let features = []
    //entities.forEach( async entity => {
    for(let index = 0; index < entities.length; index++){
        let entity = entities[index]
        let record = null
        switch(entity.type) {
            case 'variable':
                record = Feature.build({
                    name: 'influence',
                    value: Math.random()*11,
                    EntityId: entity.id
                }),
                features.push( await record.save() )
                record = Feature.build({
                    name: 'dependence',
                    value: Math.random()*11,
                    EntityId: entity.id
                })
                features.push( await record.save() )
                break;
            case 'actor':
                const entityVariable = entities.filter( e => e.type==='variable')
                record = Feature.build({
                    name: 'influence',
                    value: Math.random()*11,
                    EntityId: entity.id
                }),
                features.push( await record.save() )
                record = Feature.build({
                    name: 'dependence',
                    value: Math.random()*11,
                    EntityId: entity.id
                })
                features.push( await record.save() )
                record = Feature.build({
                    name: 'variable',
                    value: entityVariable[Math.floor( Math.random()*entityVariable.length )].id,
                    EntityId: entity.id
                })
                features.push( await record.save() )
                break;
        }
    }

    return { proyects, users, modules, entities, features }

}

const getRandomElement = (elements) => {
    const index = Math.floor(Math.random()*elements.length)
    return elements[index]
}

