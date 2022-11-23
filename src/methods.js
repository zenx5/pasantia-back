const getAll = async (ModelEntity, options = {}) => async (req, res)=>{
    const result = await ModelEntity.findAll(options);      
    if( result.length > 0 ){
        res.json({message:`Select All Record`, data:result, error: false})
    }else{
        res.json({message:`Not Record Selected`, data:[], error: true})
    }
}

const getUnique = async (ModelEntity, options={}, keyId = 'id') => async (req, res)=>{
    const defaultOptions = {
        where:{
            [keyId]: req.params.id,
            ...options.where
        },
        ...options
    }
    const result = await ModelEntity.findAll( defaultOptions )
    if( result.length > 0 ){
        res.json({message:`Select Record ${keyId}=${req.params.id}`, data:result, error: false})
    }else{
        res.json({message:`Not Record Selected`, data:[], error: true})
    }
}

const create = async (ModelEntity) => async (req, res)=>{
    const record = ModelEntity.build( req.body )
    try{
        await record.save()
        res.json({message:`Select Record id=${record.id}`, data: record, error: false})
    }catch(error){
        res.json({message:error.message, data: [], error: true})
    }
}

const update = async (ModelEntity, options = {}, keyId='id') => async (req, res)=>{
    const defaultOptions = {
        where: {
          [keyId]: req.params.id,
          ...options.where
        },
        ...options
    }
    const before = await ModelEntity.findAll( defaultOptions )
    const result = await ModelEntity.update( req.body, defaultOptions )
    const after = await ModelEntity.findAll( defaultOptions )
    if( result ){
        res.json({message:`Update Record ${keyId}=${req.params.id}`, data: {before: before, after: after }, error: false})
    }else{
        res.json({message:'Not Update Record', data: [], error: true})
    }   
}

const destroy = async (ModelEntity, options = {}, keyId='id') => async (req, res) => {
    const defaultOptions = {
        where: {
          [keyId]: req.params.id,
          ...options.where
        },
        ...options
    }
    const before = await ModelEntity.findAll( defaultOptions )
    const result = await ModelEntity.destroy( defaultOptions );
    if(result){
        res.json({message:`Delete Record ${keyId}=${req.params.id}`, data: before, error: false})
    }else{
        res.json({message:`Not Delete Record`, data: [], error: true})
    }   
}

export {
    getAll,
    getUnique,
    create,
    update,
    destroy
}