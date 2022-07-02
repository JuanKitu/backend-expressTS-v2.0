import clc from 'cli-color';
import sequelize from './database/database';
import app from './app';

sequelize.sync();
app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(clc.magenta.inverse.bold(`Server on: localhost:${app.get('port')}`));
});
