"use strict";

export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Niveis", "deletedAt", {
			allowNull: true,
			type: Sequelize.DATE,
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Niveis", "deletedAt");
	},
};