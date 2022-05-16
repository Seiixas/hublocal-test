import { dataSource } from '../typeorm/datasource';
import { app } from './app';

const PORT = 3333;

dataSource
  .initialize()
  .then(() => {
    app.listen(PORT, () => {
      return console.log(`🚀 Service started at port - ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
