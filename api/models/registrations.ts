import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
	class Resgistrations extends Model {
		static associate(models: any) {
			Resgistrations.belongsTo(models.Pessoas, {
				foreignKey: "estudante_id"
			});
			Resgistrations.belongsTo(models.Turmas, {
				foreignKey: "turma_id"
			});
		}
	}
	Resgistrations.init(
		{
			status: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "Matriculas",
			paranoid: true
		}
	);
	return Resgistrations;
};
