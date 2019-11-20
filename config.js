const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/graphqldb';

mongoose.connect(url, {
  useUnifiedTopology:
    true,
  useNewUrlParser: true,
});
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));
