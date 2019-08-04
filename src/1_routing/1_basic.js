module.exports = function(router) {

    //1.1. Definir una ruta GET /basic/text que responda un texto 'Hello express'
    router.get('/basic/text', (req, res) =>{
        res.send('Hello express');
    });

    //1.2. Definir una ruta GET /basic/json que responda un json {hello: 'express'}
    router.get('/basic/json', (req, res) =>{
        res.json({
            hello: 'express'
        })
    });


    //1.3. Definir una ruta GET /basic/query que reciba dos numeros a y b por query
    //y responda la suma
    //Ejemplo de request: /basic/query?a=1&b=2 -> '3'
    router.get('/basic/query', (req, res) =>{
        const {a, b} = req.query;
        const suma = (+a) + (+b);
        res.send(`${suma}`);
    });

};