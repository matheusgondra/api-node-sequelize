export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Pessoas", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			nome: {
				type: Sequelize.STRING
			},
			ativo: {
				type: Sequelize.BOOLEAN
			},
			email: {
				type: Sequelize.STRING
			},
			role: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, _Sequelize) {
		await queryInterface.dropTable("Pessoas");
	}
};
