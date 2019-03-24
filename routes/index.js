// ./routes/index.js
const tasks = require('./tasks');
// const photos = require('./photos');

module.exports = app => {
  app.use('/tasks', tasks);
  // app.use('/photos', photos);
  // etc..
};
