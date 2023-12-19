import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from 'expo-router'
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";

const Signin = () => {
  const navigation = useNavigation()

  const [dktk, setdktk] = useState('');
  const [dkmk, setdkmk] = useState('');
  const [dkmk2, setdkmk2] = useState('');
  const [ErrorMessage, setErrorMessage] = useState('');
  const [gender, setgender] = useState('')

  function ktmk(dkmk, dkmk2) {
      if (dkmk.length < 6) {
          setErrorMessage('Mật khẩu ít nhất 6 ký tự')
          return false;
      }
      if (dkmk === dkmk2)
          return true;
      setErrorMessage('Mật khẩu không trùng khớp')
      return false;
  }
  function kttongquat(dktk, dkmk, gender) {
      if (dktk === '' || dkmk === '' || gender === '') {
          setErrorMessage('Vui lòng điền đủ thông tin')
          return false;
      }
      return true;
  }
  function ktnamnu(gender) {
      if (gender === '1' || gender === '0')
          return true;
      setErrorMessage('Vui lòng chỉ nhập 0 hoặc 1')
      return false;
  }
  const data = {
      email: dktk,
      gender: gender,
  }
  const onClickDangKy = () => {
      if (kttongquat(dktk, dkmk, gender) && ktnamnu(gender))
          if (ktmk(dkmk, dkmk2)) {
              auth().createUserWithEmailAndPassword(dktk, dktk)
                  .then(() => {
                      try {
                          firestore()
                              .collection('users')
                              .add(data);
                      } catch (e) { 
                          console.error(e);
                      }
                      navigation.goBack();
                  })
                  .catch((e) => {
                      console.error(e)
                      setErrorMessage('Tài khoản đã đăng ký hoặc định dạng không đúng')
                  });
          }
  }
  return (
      <View style={{
          flex: 1,
      }}>

          {/* Logo */}
          <View style={{
              marginTop: 20,
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center',

          }}>
              <Image source={require('./(modal)/img/fooddome_118034.png')}
                  resizeMode="contain" />
          </View>

          {/* khung dang nhap */}
          <View style={{
              margin: 20,
              flex: 4,
          }}>
              <TextInput style={{
                  borderColor: 'grey',
                  borderRadius: 20,
                  borderWidth: 2,
                  paddingLeft: 10,
                  height: 40,
              }}
                  placeholder="Vui Lòng Nhập Email"
                  value={dktk}
                  onChangeText={(text) => setdktk(text)}>
              </TextInput>
              <TextInput style={{
                  borderColor: 'grey',
                  borderRadius: 20,
                  borderWidth: 2,
                  paddingLeft: 10,
                  marginTop: 10,
                  height: 40,
              }}
                  placeholder="Vui lòng Nhập Mật khẩu"
                  secureTextEntry={true}
                  value={dkmk}
                  onChangeText={(text) => setdkmk(text)}>
              </TextInput>
              <TextInput style={{
                  borderColor: 'grey',
                  borderRadius: 20,
                  borderWidth: 2,
                  paddingLeft: 10,
                  marginTop: 10,
                  height: 40,
              }}
                  placeholder="Vui lòng Nhập Lại Mật khẩu"
                  secureTextEntry={true}
                  value={dkmk2}
                  onChangeText={(text) => setdkmk2(text)}>
              </TextInput>
              <TextInput style={{
                  borderColor: 'grey',
                  borderRadius: 20,
                  borderWidth: 2,
                  paddingLeft: 10,
                  marginTop: 10,
                  height: 40,
              }}
                  keyboardType='numeric'
                  placeholder="0 là Nữ, 1 là Nam"
                  value={gender}
                  onChangeText={(text) => setgender(text)}>
              </TextInput>
              <TouchableOpacity style={{
                  backgroundColor: "#999999",
                  marginTop: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
              }} onPress={onClickDangKy}>
                  <Text style={{
                      fontSize: 40,
                  }}>Đăng Ký</Text>
              </TouchableOpacity>
              <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
              }}>
                  <Text style={{
                      fontSize: 20,
                      color: 'red',
                      fontWeight: 'bold'
                  }}>{ErrorMessage}</Text>
              </View>
          </View>
          <View style={{
              flex: 1,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
          }}>
              <Text style={{
                  fontSize: 16,
              }}>Đã có tài khoản:</Text>
              <TouchableOpacity onPress={navigation.goBack}>
                  <Text style={{
                      fontSize: 16,
                      color: "red",
                  }}>Quay lại đăng nhập</Text>
              </TouchableOpacity>
          </View>
      </View>
  )
}


export default Signin
