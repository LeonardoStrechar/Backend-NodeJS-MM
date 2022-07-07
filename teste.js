const express = require('express');

const server = express();

server.use(express.json());

// exemplo de rota
// server.get('/curso', () => {
//     console.log('acessou a rota')
// })

//exempolo de rota com texto
// server.get('/curso', (req, res) => {
//     return res.send('Hello word');
// } )

//exemplo de rota com json
// server.get('/curso', (rreq, res) => {
//     return res.json({curso:'nodejs'})
// })

// server.get('/curso/:id', (req, res) => {
//     const id = req.params.id;
//     return res.json({curso:`curso: ${id}`});
// })


const cursos = ['nodejs', 'javascript', 'react native'];

//middleware ou dbug
server.use((req, res, next) => {
    console.log(`Url chamada: ${req.url}`)

    return next();
})

//get
server.get('/cursos', (req, res) => {
    return res.json(cursos);
} )

server.get('/cursos/:index', (req, res) => {
    const { index } = req.params;
    return res.json(cursos[index]);
})

//post 
server.post('/cursos', (req, res) =>{
    const { name } = req.body;
    cursos.push(name);
    return res.json(cursos);
})

//update
server.put('/cursos/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);
})

//delete
server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params;

    cursos.splice(index, 1);
    return res.json(cursos)
})

server.listen(3000);
