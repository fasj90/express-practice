const dataSource = require('../lib/dataSource.json');
const multer = require('multer');
const multerImages = multer({ dest: 'public/images/' });
const fs = require('fs');

module.exports = function(router) {
    //1.1. Definir una ruta GET /advanced/users que responda todos los usuarios en el dataSource
    //Ejemplo de respuesta: [{id: 1, name: 'Leanne Graham', ...}, ...]
    router.get('/advanced/users', (req, res) =>{
        res.send(dataSource);
        // res.json({
        //     dataSource
        // });
    });


    //1.2. Definir una ruta GET /advanced/users/:id que responda el usuario con el id indicado
    //Ejemplo de respuesta: {id: 1, name: 'Leanne Graham', ...}
    router.get('/advanced/users/:id', (req, res) =>{
        const {id} = req.params;
        const user = dataSource.find(user => user.id === +id);

        res.send(user);
    });



    //1.3. Revisa sobre body-parser en https://www.npmjs.com/package/body-parser
    //Definir una ruta PATCH /advanced/users/:id que actualice el usuario con el id indicado
    //y responda el usuario actualizado. La data para actualizar viene en req.body
    //Ejemplo de respuesta: {id: 1, name: 'Leanne Graham', ...}
    //NOTE: Revisa la funcion Array.findIndex in https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/findIndex
    
    router.patch('/advanced/users/:id', (req, res) => {
        const {id} = req.params;
        const userIndex = dataSource.findIndex(user => user.id === +id);
        dataSource[userIndex] = {...dataSource[userIndex], ...req.body};
        res.json(dataSource[userIndex]);
    });


    //1.4. Instala el módulo multer y revisa la documentación en https://github.com/expressjs/multer
    //Definir una ruta POST /advanced/upload que reciba una imagen en el payload
    //y la suba al directorio public/images conservando el nombre original de la imagen.
    //IMPORTANTE:
    //- La imagen se envia con el nombre 'image'. Prueba hacer un console.log(req.file) para guiarte.
    //- La imagen debe conservar el nombre original al guardarse en el directorio public/images
    //- El directorio 'public' esta en el directorio root del proyecto.
    //- Al finalizar de subir la imagen se debe responder un 'OK'
    router.post('/advanced/upload', multerImages.single('image'), (req, res, next) =>{
        console.log(req.file);
        const {pth, originalName, destination} = req.file;
        const newPath = `${destination}${originalName}`;
        fs.rename(path, newPath, (err)=>{
            res.send('Ok');
        });
    });  
};