import { 
    User, 
    Proyect, 
    Entity,
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
    let proyects = []
    
    for(let index = 0; index < users.length; index++ ){
        const numberProyects = Math.floor(Math.random()*5)+2
        for(let jndex = 0; jndex < numberProyects; jndex++ ){
            const record = Proyect.build( {
                name:`Proyect ${index}-${jndex}`,
                UserId: users[index].id,
                module: getModules().join(',')
            } )
            proyects.push( await record.save() )
        }
    }

    /*ENTITIES*/
    let entities = []
    for(let index = 0; index < proyects.length; index++ ){
        let variables = 0
        let actores = 0
        let hipotesis = 0
        let eventos = 0
        let politicas = 0
        if( proyects[index].module.includes('MULTIPOL') ){
            politicas = 9
            eventos = 8
            hipotesis = 8
            actores = 4
            variables = 5
        }else if( proyects[index].module.includes('SMIC-PRO EXPERT') ){
            eventos = 8
            hipotesis = 8
            actores = 4
            variables = 5
        }else if( proyects[index].module.includes('MORPHOL') ){
            hipotesis = 8
            actores = 4
            variables = 5
        }else if( proyects[index].module.includes('MACTOR') ){
            actores = 4
            variables = 5
        }else{
            variables = 5
        }
        let numberEntities = politicas + eventos + hipotesis + actores + variables


        let lastEntities1 = []
        let lastEntities2 = []
        let change = false
        let type = ''
        for(let jndex = 0; jndex < numberEntities; jndex++ ){
            
            if( politicas > 0 ){
                type = 'politicas'
                politicas -= 1
                change =  politicas === 0 
            }else if( eventos > 0 ){
                type = 'eventos'
                eventos -= 1
                change =  eventos === 0 
            }else if( hipotesis > 0 ){
                type = 'hipotesis'
                hipotesis -= 1
                change =  hipotesis === 0 
            }else if( actores > 0 ){
                type = 'actores'
                actores -= 1
                change =  actores === 0 
            }else if( variables > 0 ){
                type = 'variables'
                variables -= 1
                change =  variables === 0 
            }


            const record = Entity.build( {
                name:`${type} ${index}-${jndex}`,
                dependence: Math.random()*10,
                influence: Math.random()*10,
                type: type,
                belongsTo: getRandomElement( lastEntities2 ),
                ProyectId: proyects[index].id
            } )
            const newEntity = await record.save()
            lastEntities1.push( newEntity.id )
            entities.push( newEntity )
            if( change ){
                lastEntities2 = lastEntities1
                lastEntities1 = []
                change = false
            }
        }
    }
    
    
    return { proyects, users, entities }

}

const getRandomElement = (elements) => {
    if( elements.length === 0 ) return null
    const index = Math.floor(Math.random()*elements.length)
    return elements[index]
}

const getModules = () => {
    let modules = ['MIMAC']
    let otherModules = ['MACTOR', 'MORPHOL', 'SMIC-PRO EXPERT', 'MULTIPOL']
    let quantity = Math.floor( Math.random()*otherModules.length ) + 1
    while( quantity > 0 ) {
        const index = Math.floor( Math.random()*quantity )
        modules.push( otherModules[ index ] )
        otherModules = otherModules.filter( (module, j) => j!==index )
        quantity -= 1
    }
    return modules
}