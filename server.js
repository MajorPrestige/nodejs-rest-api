const mongoose = require('mongoose');

const app = require('./app');
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .set('strictQuery', false)
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log('\x1b[36m%s\x1b[0m', 'Database connection successful');
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
