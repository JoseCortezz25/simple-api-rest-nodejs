const express = require('express');
const conexion = require('./database');

const Router = express.Router();

let menError = [{"mensaje": "No hay nada"}]
let menValidar = [{"mensaje": "true"}]


Router.get('/', (req, res)=>{
    res.render('index');
})

Router.get('/api/usuarios', (req, res)=>{
    const { nombre, contraseña } = req.query;
    console.log(nombre + "   -   " + contraseña)
    conexion.query(`SELECT * FROM usuario WHERE nombre = '${nombre}' and contraseña = '${contraseña}'`, (error, consultado)=>{
        console.log('--------------------------------------');
        console.table(consultado);
        console.log('--------------------------------------');
        if(consultado != ""){
            res.json(consultado[0]);
        }else{
            res.json(menError[0]);
        }
    });
})

Router.get('/api/usuarios/register', (req, res)=>{
    const { nombre, contraseña } = req.query;
    console.log(nombre + "   -   " + contraseña)

    conexion.query(`INSERT INTO usuario(nombre, contraseña) VALUES('${nombre}', '${contraseña}')`, (error, consultado)=>{
        console.table(consultado);
        if(consultado != ""){
            res.json(consultado);
        }else{
            res.json(menError[0]);
        }
    });
})


Router.get('/api/usuarios/formulario', (req, res)=>{
    const { id, input2, input3, input4, input5, input6, input7  } = req.query;
    console.log(`Id: '${id}', Documento'${input2}', fecha nacimiento: '${input3}', lugar de nacimiento: '${input4}', Estado civil: '${input5}', 
                    Direccion: '${input6}', Telefono: '${input7}'`);

    conexion.query(`INSERT INTO hojas(id_usuario, descripcion, fecha_nacimiento, lugar_nacimiento, estado_civil, direccion, telefono) VALUES(${id},'${input2}','${input3}','${input4}','${input5}','${input6}',${input7})`, (error, consultado)=>{
        if(error){
            res.json({error: 'Ocurrio un error'})
        }
        if(consultado == ''){
            res.json({error: 'No hay datos encontrados'})
        }
        if(consultado != ''){
            res.json(consultado)
            console.log(consultado)
        }
   
    });


})


Router.get('/api/usuarios/mostrar/formulario', (req, res)=>{
    const { id } = req.query;
    console.log(id);

    conexion.query(`SELECT * FROM hojas WHERE id_usuario = '${id}'`, (error, consultado)=>{
        console.log("---------------------- Consultado: -----------------------------");
        console.table(consultado);
        console.log("---------------------- ----------- -----------------------------");
        if(consultado != ""){
            res.json({consultado});
        }else{
            res.json(menError[0]);
        }

    });
})


Router.get('/api/usuarios/eliminar/formulario', (req, res)=>{
    const { id, user } = req.query;
    console.log(id);

    if(id == undefined){
        res.json({error: 'El dato ingresado es undefined'})
    }else{
        conexion.query(`DELETE FROM hojas WHERE id_hojas = '${id}' and id_usuario = '${user}'`, (error, consultado)=>{
            if(error){
                res.json({error: 'Ocurrio un error'})
            }
            if(consultado == ''){
                res.json({error: 'No hay datos encontrados'})
            }
            if(consultado != ''){
                res.json({correcto: 'La hoja fue eliminada'})
                console.log(consultado)
            }
        });
    }
})

Router.get('/api/usuarios/actualizar/formulario', (req, res)=>{
    const { id, input2, input3, input4, input5, input6, input7 } = req.query;
    console.log(id);

    if(id == undefined){
        res.json({error: 'El dato ingresado es undefined'})
    }else{
        try {
            conexion.query(
                `UPDATE hojas 
                SET descripcion = '${input2}', fecha_nacimiento = '${input3}', lugar_nacimiento = '${input4}', 
                estado_civil = '${input5}', direccion = '${input6}', telefono = '${input7}' 
                WHERE id_hojas = '${id}'`, 
                (error, consultado)=>{

                if(consultado == ''){
                    res.json({error: 'No hay datos encontrados'})
                }
                if(consultado != ''){
                    res.json(consultado)
                    console.log(consultado)
                }
            });
        } catch (error) {
            console.log("---------------------- Error -----------------------------");
            console.log(error)
            res.json({error: 'Ocurrio un error'})
        }

    }
})

Router.get('/api/usuario', (req, res)=>{
    const { name } = req.query;
    console.log(name);

    if(name == undefined){
        res.json({error: 'El dato ingresado es undefined'})
    }else{
        try {
            conexion.query(`SELECT contraseña FROM usuario WHERE nombre = '${name}'`, (error, consultado)=>{
                if(consultado == ''){
                    res.json({error: 'No hay datos encontrados'})
                }
                if(consultado != ''){
                    res.json(consultado[0])
                    console.log(consultado)
                }
            });
        } catch (error) {
            console.log("---------------------- Error -----------------------------");
            console.log(error)
            res.json({error: 'Ocurrio un error'})
        }

    }
})


Router.get('/api/usuarios/hoja/', async (req, res)=>{
    const { id } = req.query;
    console.log(id);

    if(id == undefined){
        res.json({error: 'El dato ingresado es undefined'})
    }else{
        try {
            conexion.query(`SELECT * FROM hojas WHERE id_hojas = ${id}`, (error, consultado)=>{
                if(consultado == ''){
                    res.json({error: 'No hay datos encontrados'})
                }
                if(consultado != ''){
                    res.json(consultado[0])
                    console.log(consultado[0])
                }
            });
                    
        } catch (error) {
            console.log("---------------------- Error -----------------------------");
            console.log(error)
            res.json({error: 'Ocurrio un error'})
        }

    }
})
module.exports = Router;