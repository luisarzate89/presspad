const app = require('./app');
const dbConnection = require('./database/dbConnection');
require('sqreen');

dbConnection()
  .then(() => {
    app.listen(app.get('port'), () => {
      // eslint-disable-next-line no-console
      console.log('Listening on port: ', app.get('port'));
    });
  })
  .catch(err => {
    // handle failing db connection
    console.log('db connection failed', err.name);
  });
