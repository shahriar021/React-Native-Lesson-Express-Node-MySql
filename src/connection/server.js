const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const usersModel = require('../model/usersModel');
app.post('/createUsers', usersModel.createUsers);
app.get('/createUsers', usersModel.usersListAll);
app.get('/get_all/admin_page_list', usersModel.getAllAdminPageList);

// app.post('/signup', (req, res) => {
//   const {full_name, email, password, mobile, gender, religion} = req.body;

//   // Perform any necessary validation here

//   const sql =
//     'INSERT INTO users ( full_name, email, password, mobile, gender,religion) VALUES (?, ?, ?, ?, ?, ?)';
//   const values = [full_name, email, password, mobile, gender, religion];

//   connection.query(sql, values, (error, results) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({error: 'User registration failed'});
//     }

//     return res.status(200).json({success: true, userId: results.insertId});
//   });
// });
app.get('/', (req, res) => {
  res.send('Server running shahriar chowdhury');
});

const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
