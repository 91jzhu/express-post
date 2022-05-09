const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize('note_database', 'root', '212106Zb%', {
    host: 'localhost',
    dialect: 'mysql'
});

const Note = sequelize.define('notes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

// class Note extends Model {
// }

// Note.init({
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true
//     },
//     note: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {sequelize, modelName: 'notes'});

const getAll = async () => {
    try {
        var res = await Note.findAll({raw: true})
    } catch (e) {
        console.warn(e)
    }
    return res
}

const getOneNote = async (id) => {
    try {
        var res = await Note.findAll({raw: true, where: {id}})
    } catch (e) {
        console.warn(e)
    }
    return res
}

const createNote = async (id, note) => {
    try {
        var res = await Note.create({id, note})
    } catch (e) {
        console.warn(e)
    }
    return res
}

const modifyNote = async (id, note) => {
    try {
        var res = await Note.update({note}, {where: {id}})
    } catch (e) {
        console.warn(e)
    }
    return res
}

const deleteNote = async (id) => {
    try{
        var res=await Note.destroy({where: {id}})
    }catch(e){
        console.warn(e)
    }
    return res
}

try {
    (async () => {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    })()
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = {
    getAll,
    getOneNote,
    createNote,
    modifyNote,
    deleteNote
}
