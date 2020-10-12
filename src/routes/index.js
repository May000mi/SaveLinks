const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index');
});

// router.get('/contacto', (req, res)=>{
//     res.send('Contacto')
// });

// router.get('/info', (req, res)=>{
//     res.send('Acerca de...')
// });

module.exports = router;