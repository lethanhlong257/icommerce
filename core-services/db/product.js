import Sequelize from 'sequelize'

export default function (db) {
  const schema = {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    branch: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    color: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'no color'
    },
    discription: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }

  
  const options = {
    paranoid: true
  }

  return db.define('Product', schema, options)
}
