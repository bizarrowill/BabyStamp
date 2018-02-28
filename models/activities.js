
// ======= Here we start saving the user activity into the database=============JP

module.exports = function(sequelize, DataTypes) {
    var activty = sequelize.define("activty", {
      text: {
        type: DataTypes.STRING,
        // AllowNull is a flag that restricts a Stamp from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our Stamp is between 1 and 140 characters
        validate: {
          len: [1, 140]
        }
      },
      complete: {
        type: DataTypes.BOOLEAN,
        // defaultValue is a flag that defaults a new Stamps complete value to false if
        // it isn't supplied one
        defaultValue: false
      }
    });
    return activty;
  };
  