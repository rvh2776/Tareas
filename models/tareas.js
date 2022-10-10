require("colors");
const Tarea = require("./tarea");

/***
 * _listado
 * 
 *   {  uuid-12345-244566-32144: {id:12, desc: asd, completadoEn: 99565211222}}    
 *
 */

class Tareas {

    _listado = {};

    // con get retorno un nuevo arreglo.
    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            
            const tarea = this._listado[key];
            listado.push(tarea);

        });
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){

        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    
        
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
        console.log();

        // this.listadoArr.forEach((tarea, i) => {

        //     const idx = `${i + 1}`.green;
        //     const {desc, completadoEn} = tarea;
        //     const estado = (completadoEn)
        //                     ? 'Completada'.green
        //                     : 'Pendiente'.red;
        
        //     console.log(`${idx} ${desc} :: ${estado}`)

        // })
        
        let num = 0;

        for (let data of this.listadoArr){
            num ++;
            (data.completadoEn) 
                ? console.log(`${num}.`.green, data.desc,'::',`${'Completada'}`.green)
                : console.log(`${num}.`.green, data.desc,'::',`${'Pendiente'}`.red);
        }
    }

    listarPendientesCompletadas(completadas = true){
        console.log();
        
        let num = 0;

        for (let data of this.listadoArr){
            num ++;
            
            const estado = (data.completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red

           if (data.completadoEn && completadas === true)
                console.log(`${num}.`.green, data.desc,'::', `${data.completadoEn}`.green);
                else if (!data.completadoEn && completadas === false){
                    console.log(`${num}.`.green, data.desc,'::', estado);
                }
        }
    }

    toggleCompletadas(ids = []){

        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach( tarea => {

            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })


    }


}

module.exports = Tareas;