const connection = require('../connection/config/database');
const sha1 = require('sha1');

const usersModel = {
  createUsers: async (req, res) => {
    try {
      const {full_name, email, password, mobile, gender, religion, dob} =
        req.body;

      // Hash the password using SHA-1
      const hashedPassword = sha1(password);

      // Insert the user into the database
      const sql =
        'INSERT INTO users (  full_name, email,password,mobile, gender, religion, dob  ) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [
        full_name,
        email,
        hashedPassword,
        mobile,
        gender,
        religion,
        dob,
      ];

      connection.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({message: 'User creation failed'});
        } else {
          res.status(200).json({message: 'User created successfully', result});
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  usersListAll: async (req, res) => {
    try {
      const data = 'select * from table_name';

      connection.query(data, function (error, result) {
        if (!error) {
          //   return  res.send(result,'nayan')

          res.status(200).send(result);
          // res.sendFile(path.join(__dirname + "../../App.js"));
        } else {
          console.log(error, 'shahriar');
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  getAllAdminPageList: async (req, res) => {
    try {
      const data = 'select * from 	table name';
      connection.query(data, function (error, result) {
        console.log(result);
        if (!error) {
          res.send(result);
        } else {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = usersModel;
