const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo) {
      this.nombreArchivo = nombreArchivo;
      
    }
    async loadFile() {
        await fs.promises.readFile(this.nombreArchivo, 'utf-8')
        .then(contenido => {
            this.fileObject = JSON.parse(contenido)
        })
        .catch(err => console.log('Error al leer el archivo: ', err));
    }
    async save(objeto) {
        if(!this.fileObject){
            await this.loadFile();
        }
        const id = this.fileObject.lastId + 1;
        this.fileObject.list[id] = {...objeto, id};
        this.fileObject.lastId = id;
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.fileObject))
            .then(() => {
                console.log('Guardado Exitoso!');
                return {...objeto, id}
            })
            .catch(err => console.log('Ocurrio un error al guardar: ', err));
    }
    async update(id, objeto) {
        if(!this.fileObject){
            await this.loadFile();
        }
        this.fileObject.list[id] = {...objeto};
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.fileObject))
            .then(() => {
                console.log('Actualizado Exitoso!');
                return {...objeto, id}
            })
            .catch(err => console.log('Ocurrio un error al actualizar: ', err));
    }
    async getById(id) {
        if(!this.fileObject){
            await this.loadFile();
        }
        return this.fileObject.list[id];
    }
    async getAll() {
        if(!this.fileObject){
            await this.loadFile();
        }
        return Object.keys(this.fileObject.list).map(id => this.fileObject.list[id]);
    }
    async deleteById(id) {
        if(!this.fileObject){
            await this.loadFile();
        }
        delete this.fileObject.list[id];
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.fileObject))
            .then(() => console.log('Eliminado del item exitoso!'))
            .catch(err => console.log('Ocurrio un error al eliminar: ', err));
    }
    async deleteAll() {
        if(!this.fileObject){
            await this.loadFile();
        }
        this.fileObject.list = [];
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.fileObject))
            .then(() => console.log('Eliminado exitoso!'))
            .catch(err => console.log('Ocurrio un error al eliminar: ', err));
    }
  }

module.exports =  Contenedor ;