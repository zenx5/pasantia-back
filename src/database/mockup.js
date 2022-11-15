import { 
    User, 
    Proyect, 
    Module, 
    Entity,
    Feature 
} from './Models.js';

export const generateData = async () => {
    /*USERS*/
    let users = []
    for(let index = 0; index < 4; index++ ){
        const firstname = ['jose', 'juan', 'adrian', 'maria', 'leo','ana','pedro'][Math.floor(Math.random()*7)]
        const lastname = ['perez', 'mañez', 'villaroel', 'martinez', 'carpio','morales','rojas'][Math.floor(Math.random()*7)]
        const type = ['administrador', 'estudiante', 'profesor', 'instituto'][Math.floor(Math.random()*4)]
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
    //modules = modules.map( async (module, index) => {
        const record = Module.build( {
            name:['MIMAC', 'MACTOR', 'SMIC-PRO EXPERT', 'MORPHOL', 'MULTIPOL'][index]
        } )
        modules.push( await record.save() )
    //})
    }

    

    /*VARIABLES*/
    // const numberVariables = Math.floor(Math.random()*20)+10
    // let variables = []
    // for(let index = 0; index < numberVariables; index++ ){
    //     const record = Variable.build( {
    //         name:`Variable ${index}`,
    //         description: `This is variable ${index}`,
    //         influence: Math.floor(Math.random()*10)+1,
    //         dependence: Math.floor(Math.random()*10)+1
    //     } )
    //     variables.push( await record.save() )
    // }

    modules.forEach( module => {
        module.addProyect( getRandomElement(proyects) )
    })

    // modules.forEach( module => {
    //     const quantity = Math.floor(Math.random()*variables.length) + 5
    //     let copyVariables = variables
    //     for(let index = 0; index < quantity; index++ ){
    //         const i = Math.floor(Math.random()*copyVariables.length)
    //         module.addVariable( copyVariables[i] )
    //         copyVariables = copyVariables.filter( (element, indexElement)=>indexElement!==i )
    //     }
    // })

    return { proyects, users, modules}

}

const getRandomElement = (elements) => {
    const index = Math.floor(Math.random()*elements.length)
    return elements[index]
}

