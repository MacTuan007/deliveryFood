import React, { useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-paper';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [tk, settk] = useState("")
    const [mk, setmk] = useState("")
    console.log(tk, mk)
    const [ErrorMessage, setErrorMessage] = useState('');
    const onClickDangNhap = async () => {
            await auth().signInWithEmailAndPassword(tk, mk).then(() => {
                    console.log('đăng nhập thành công')
                    setErrorMessage('')
                    navigation.navigate('home');
                    
                })
                .catch((e) => {
                    console.error(e)
                    setErrorMessage('Sai tài khoản hoặc mật khẩu')
                })
    }
    const dangky = () => {
        auth().createUserWithEmailAndPassword("abcd@gmail.com", "123456").then(() => {
            console.log('đăng ký thành công')
            navigation.navigate('home');
        })
    }
    return (
        <View style={{
            flex: 1,
        }}>
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
                    backgroundColor: "#999999",
                    marginTop: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={()=>onClickDangNhap}>
                        <Text style={{
                            fontSize: 40,
                        }}>Đăng Nhập</Text>
                    </TouchableOpacity>
                    <Button mode='outlined' onPress={onClickDangNhap}>Đăng nhập</Button>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={()=>navigation.navigate("home")}>
                        <Text style={{
                            fontSize: 40,
                        }}>Đăng ký</Text>
                    </TouchableOpacity>
                    
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

                <Text style={{
                    fontSize: 16,
                    color: "red",
                }}>Đăng ký ngay</Text>
            </View>
        </View>
    );
};

export default LoginScreen;
