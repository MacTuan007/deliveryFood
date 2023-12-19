import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';

const LoginScreen = () => {
    const navigation = useNavigation()
    const [tk, settk] = useState('')
    const [mk, setmk] = useState('')
    const [ErrorMessage, setErrorMessage] = useState('');

    function ktthongtin(tk, mk) {
        if (tk === '' || mk === '') {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin')
            return false;
        }
        return true;

    }
    const onClickDangNhap = () => {
        if (ktthongtin(tk, mk))
            auth()
                .signInWithEmailAndPassword(tk, mk)
                .then(() => {
                    console.log('đăng nhập thành công')
                    setErrorMessage('')
                    settk('')
                    setmk('')
                    navigation.navigate('home')
                })
                .catch((e) => {
                    console.error(e)
                    setErrorMessage('Sai tài khoản hoặc mật khẩu')
                })
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
                <Image source={require('./img/fooddome_118034.png')}
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
                    placeholder="abcd@gmail.com"
                    value={tk}
                    onChangeText={text => settk(text)}>
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
                    value={mk}
                    onChangeText={text => setmk(text)}>
                </TextInput>
                <View style={{

                }}>
                    <Button onPress={onClickDangNhap}
                        style={{
                            backgroundColor: "#999999",
                            marginTop: 30,
                            justifyContent: 'center',
                        }}>
                        <Text style={{
                            fontSize: 20,
                        }}>Đăng Nhập</Text>
                    </Button>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        color: 'red',
                        fontSize: 20,
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
                }}>Chưa có tài khoản:</Text>
                <Link href={"/signin"}>
                    <Text style={{
                        fontSize: 16,
                        color: "red",
                    }}>Đăng ký ngay</Text>
                </Link>
            </View>
        </View>
    )
};
export default LoginScreen;
