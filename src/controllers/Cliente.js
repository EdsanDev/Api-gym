import Model from '../models/Cliente.js'

async function generateUniqueNumber() {
    let uniqueNumber;
    let exists = true;

    while(exists){
        uniqueNumber = Math.floor(Math.random()*1000000);
        const count  = await Model.countDocuments({codigo:uniqueNumber});
        if(count === 0){
            exists = false
        }

    }
    return uniqueNumber;
}

export const index = async(req,res)=>{
    const list = await Model.find()
    res.json(list)
}

export const store = async(req,res)=>{
    const {name,last_name,email,type_inscription,date_final,precio} = req.body;
    const codigo = await generateUniqueNumber();
    const create = new Model({name,last_name,email,type_inscription,date_final,precio,codigo});
    await create.save().then(()=>{
        res.send('[+] Cliente fue creado con exito!')
    })
    .catch((err)=>{
        return res.status(400).json({message:err.message})
    })
}

export const show = async(req,res)=>{
    const watch = await Model.findById(req.params._id);
    res.json(watch)
}

export const update = async(req,res)=>{
    const {_id}=req.params;
    const {name,last_name,email,type_inscription,date_final,precio} = req.body;
    await Model.findByIdAndUpdate(
        _id,
        {
            $set:{
                name,last_name,email,type_inscription,date_final,precio
            },
        },
        {useFindAndModify:false}
    );
    res.send('[+] Dato Actualizado con exito!')
}

export const destroy = async(req,res)=>{
    const {_id}=req.params;
    await Model.findByIdAndDelete(_id);
    res.send('[+]Dato fue eliminado con exito!')
}

export const search = async(req,res)=>{
    const { query } = req.query;

    if (!query) {
      return res.status(400).json(["[!] Debe proporcionar un parámetro de búsqueda"]);
    }
  
    // Puedes implementar lógica aquí para decidir si el query es nombre o código.
    // Esto depende de tus datos y cómo desees distinguir entre nombre y código.
    
    try {
      // Ejemplo de búsqueda: si el query es un número, busca por código; si es texto, busca por nombre.
      // Ajusta esta lógica según la estructura de tus datos.
      const data = await Model.find({
        $or: [
          { name: query },
          { codigo: query }
        ]
      });
  
      if (data.length === 0) {
        return res.status(404).json(["[!] No se encontró el cliente"]);
      }
      res.json(data);
    } catch (error) {
      res.status(500).json(['[!] Error al buscar los clientes']);
    }
}

export const search2 = async(req,res)=>{
    const {name,codigo} = req.query;
     let query = {};
     if(name){
         query.name = name;
     }
     if(codigo){
         query.codigo = codigo;
     }
     if(Object.keys(query).length === 0){
         return res.status(400).json(["[!]Debe proporcionar al menos un parametro de busqueda nombre y codigo"]);  
     }
    try {
     const data = await Model.find(query);
     if(data.length === 0){
         return res.status(400).json(["[!] No se encontro el cliente"]);
     } 
     res.json(data)
    } catch (error) {
     res.status(500).json(['[!] Error al buscar los clientes'])
    }
 }