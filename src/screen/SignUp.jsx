import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import axios from 'axios';

import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown';

const SignUpForm = () => {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [religion, setReligion] = useState('');
  console.log(gender);
  // const [isSelected, setSelection] = useState(false);

  //religion and gender array
  const genderArray = [
    {name: 'male', value: 1},
    {name: 'female', value: 2},
  ];

  // [
  //   {name: 'male', value: 1},
  //   {name: 'female', value: 2},
  // ];

  //

  const religionArray = [
    {name: 'islam', value: 1},
    {name: 'hindu', value: 2},
  ];
  //religion and gender array

  //date------

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  console.log(show);
  console.log(date);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    // console.log("pressed....");
  };

  const showTimepicker = () => {
    showMode('time');
  };

  //------------

  const handleSignUp = () => {
    const value = {
      full_name,
      email,
      password,
      mobile,
      gender,
      religion,
      dob: date,
    };
    console.log(value);
    // http://192.168.0.125:3000/signup
    axios
      .post('http://192.168.0.125:5002/createUsers', value)
      .then(response => {
        console.log(response);
        console.log(value);
        console.log(response.data);
        // Handle successful sign-up
      })
      .catch(error => {
        console.error(error);
        // Handle sign-up error
      });
  };

  return (
    <View>
      <Text style={styles.title}>Register Now</Text>
      <View style={styles.registerBox}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => setFullName(text)}
          // onChangeText={text => setUsername(text)}
        />

        {/* date */}
        <Text>Date Of Birth</Text>
        <View
          style={{
            flexDirection: 'row',
            padding: 1,
            margin: 5,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View>
            <Button onPress={showDatepicker} title="set date" />
          </View>
          <View style={{marginTop: 3}}>
            <Button onPress={showTimepicker} title="set time" />
          </View>
        </View>

        <Text
          style={{
            marginTop: 2,
            backgroundColor: 'blue',
            padding: 2,
            color: 'white',
            borderRadius: 10,
          }}>
          selected: {date.toLocaleString()}
        </Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}

        {/* date */}

        <Text>Religion</Text>
        <SelectDropdown
          data={religionArray.map(religion => religion.name)}
          onSelect={(selectedItem, index) => {
            setReligion(religionArray[index].value);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />

        <Text>Gender</Text>

        <SelectDropdown
          // data={genderArray}
          // onSelect={(selectedItem, index) => {
          //   setGender(selectedItem);
          //   console.log(index);

          data={genderArray.map(gender => gender.name)}
          onSelect={(selectedItem, index) => {
            setGender(genderArray[index].value);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          onChangeText={text => setMobile(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />

        {/* <View style={styles.CHkcontainer}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Do you like React Native?</Text>
          </View>
          <Text>Is CheckBox selected: {isSelected ? '👍' : '👎'}</Text>
        </View> */}

        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  registerBox: {
    borderColor: 'black',
    width: 350,
    borderWidth: 1,
    padding: 2,
    margin: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  CHkcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

export default SignUpForm;
