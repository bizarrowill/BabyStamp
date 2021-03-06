// created username column JP

module.exports = function(sequelize, DataTypes) {
  var Stamp = sequelize.define("Stamp", {
  // username: {
  //   type: DataTypes.STRING,
  //   // defaultValue is a flag that defaults a new Stamps complete value to false if
  //   // it isn't supplied one
  //   defaultValue: false
  // },
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
  // Stamp.belongsTo(username);
  return Stamp;
};
