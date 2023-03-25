'use strict';

/** @type {import('sequelize-cli').Migration} */

const chefs = require("../../data/chefs.json");

const chefsUpdate = chefs.map( ({name, country}) => {
  return {
    name,
    photo : null,
    country,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Chefs', chefsUpdate, {});
    
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Chefs', null, {});
     
  }
};
