const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('activity', {
        name: {
            type: DataTypes.STRING
        },
        dificulty: {
            type: DataTypes.INTEGER,
            validate: { min: 1, max: 5 }
        },
        duration: {
            type: DataTypes.STRING
        },
        season: {
            type: DataTypes.ENUM,
            values: ['Verano', 'Otoño', 'Invierno', 'Primavera']
        }
    }, { timestamps: false });
};