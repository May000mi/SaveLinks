const express = require('express');
const router = express.Router();
const{ isLoggedIn , isNotLoggedIn } = require('../lib/auth');

const pool = require('../database');

router.get('/add', isLoggedIn, (req, res)=>{
    //res.send('Form');
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res)=>{
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    // await pool.query('INSERT INTO links set ?', [newLink]);
    await pool.query('INSERT INTO links set ?', [newLink]);
    //console.log(newLink);
    req.flash('success', 'Enlace guardado satisfactoriamente')
    res.redirect('/links');
    //res.send('recibido-received');
});

router.get('/', isLoggedIn, async (req, res)=>{
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    // const links2 = await pool.query(`SELECT * FROM links WHERE user_id = ${req.user.id}`);
    // console.log("Links 2 es : " , links2);
    res.render('links/list', {links}); 
});

router.get('/delete/:id', isLoggedIn, async (req, res)=>{
    // console.log(req.params.id);
    // res.send('DELETED');
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Enlace Eliminado Satisfactoriamente');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
    res.render('links/edit', {link : links[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Enlace Actualizado Satisfactoriamente');
    //const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
    res.redirect('/links');
});

module.exports = router;