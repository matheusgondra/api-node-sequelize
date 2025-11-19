export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Matriculas", "deletedAt", {
			allowNull: true,
			type: Sequelize.DATE
		});
	},
	async down(queryInterface, _Sequelize) {
		await queryInterface.removeColumn("Matriculas", "deletedAt");
	}
};
