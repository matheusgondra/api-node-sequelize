export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Turmas", "deletedAt", {
			allowNull: true,
			type: Sequelize.DATE
		});
	},
	async down(queryInterface, _Sequelize) {
		await queryInterface.removeColumn("Turmas", "deletedAt");
	}
};
