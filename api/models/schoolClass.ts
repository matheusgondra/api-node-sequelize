import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
	class SchoolClass extends Model {
		static associate(models: any) {
			SchoolClass.hasMany(models.Matriculas, {
				foreignKey: "turma_id"
			});
			SchoolClass.belongsTo(models.Pessoas, {
				foreignKey: "docente_id"
			});
			SchoolClass.belongsTo(models.Niveis, {
				foreignKey: "nivel_id"
			});
		}
	}
	SchoolClass.init(
		{
			data_inicio: DataTypes.DATEONLY
		},
		{
			sequelize,
			modelName: "Turmas",
			paranoid: true
		}
	);
	return SchoolClass;
};
