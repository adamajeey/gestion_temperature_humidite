'use strict';
module.exports = ( DataTypes) => { 
    
    const Movie = define('Movie', { 
        Temperature: DataTypes.STRING,
        Humidite: DataTypes.STRING,
        Heure: DataTypes.STRING
    }, {
        underscored: true
    })

    Movie.associate = function(models) {
        // define your relations 
    }

    return Movie;
};
