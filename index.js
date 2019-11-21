const express = require('express');
require('./config');
const bodyParser = require('body-parser');
const server = require('./graphql');
const { User } = require('./models');

const app = express();
server.applyMiddleware({ app });

app.use(bodyParser.json());

app.post('/user', async (req, res) => {
  const data = req.body;
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
  res.send(dataUser);
});

app.put('/user', async (req, res) => {
  const id = req.query._id;
  const newName = req.query.userName;
  const dataUser = await User.where({ _id: id }).updateOne({ $set: { userName: newName } });
  res.send(dataUser);
});

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}ql`));
