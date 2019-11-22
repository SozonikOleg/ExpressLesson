const express = require('express');
require('./config');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const server = require('./graphql');
const { User, Comments } = require('./models');


const app = express();
server.applyMiddleware({ app });

const createUniqId = uuidv4();

const checkId = (req, res, next) => {
  req.query.id !== '100'
    ? res.status(404).send("Sorry, can't delete that")
    : next();
};

app.use(checkId);

app.use(bodyParser.json());

app.post('/user', async (req, res) => {
  const data = req.body;
  data.uniqId = createUniqId;
  const createdUser = await User.create(data);
  res.send(createdUser);
});

app.get('/users', async (req, res) => {
  const dataUser = await User.find({});
  res.send(dataUser);
});

app.get('/user', async (req, res) => {
  const dataUser = await User.findOne({ _id: req.query._id });
  res.send(dataUser);
});

app.delete('/user', async (req, res) => {
  const dataUser = await User.deleteOne({ _id: req.headers._id });
  dataUser.deletedCount === 0
    ? res.status(404).send("Sorry, can't delete that")
    : res.send('User deleted!');
});

app.put('/user', async (req, res) => {
  const id = req.query._id;
  const newName = req.query.userName;
  const dataUser = await User.where({ _id: id }).updateOne({ $set: { userName: newName } });
  res.send(dataUser);
});

// This hadler for Comments schema

app.post('/comments', async (req, res) => {
  const data = req.body;
  const createdUser = await Comments.create(data);
  res.send(createdUser);
});

app.use((req, res) => {
  res.status(404).send('Error! Don`t finded routing!');
});

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}ql`));
