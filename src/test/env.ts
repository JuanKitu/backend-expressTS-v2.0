// eslint-disable-next-line import/no-import-module-exports
import sequelize from '../database/database';

async function global() {
  await sequelize.sync({ force: false });
}

export default global;
