import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
	class Levels extends Model {
		static associate(models: any) {
			Levels.hasMany(models.Turmas, {
				foreignKey: "nivel_id"
			});
		}
	}
	Levels.init(
		{
			descr_nivel: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "Niveis",
			paranoid: true
		}
	);
	return Levels;
};
