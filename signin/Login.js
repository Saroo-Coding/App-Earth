import React,{useEffect, useState} from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ImageBackground, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Login({ navigation }) {
    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");
    const getLogin = () => {
        alert(user + pass);
        // return fetch('https://localhost:7126/Login?email=')
        // .then(function(response) {
        //     if (response.ok) {
        //       //console.log(response.statusText);
        //     }
        //     else{
        //       alert("Sai tài khoản hoặc mật khẩu !!!");
        //     }
        //     return response.json();
        //   });
      };
    return (
        <SafeAreaView style={{marginLeft: 20, marginRight: 20 }}>
            <Ionicons name="arrow-back" size={40} color="black" onPress={() => navigation.navigate('Onboarding')}/>
            <Text style={{marginTop:50, fontSize:30,textAlign: 'center',color:'#dc3545',fontWeight: 'bold',}}>Đăng nhập</Text>
            <View style = {{marginTop:'20%',}}>
                <Text style={{fontSize:20,paddingTop:20,paddingBottom:7}}>Tài khoản</Text>
                <TextInput style={{fontSize:20, borderColor: '#dee2e6', borderWidth: 1, borderRadius: 5, paddingVertical: 12, paddingHorizontal: 12 }} onChangeText = {(text) => setUser(text)}></TextInput>
                <Text style={{fontSize:20,paddingTop:20,paddingBottom:7}}>Mật khẩu</Text>
                <TextInput secureTextEntry={true} style={{fontSize:20, borderColor: '#dee2e6', borderWidth: 1, borderRadius: 5 , paddingVertical: 12, paddingHorizontal: 12}} onChangeText = {(text) => setPass(text)}></TextInput>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' ,marginTop:'30%', marginBottom:20}}>
                <TouchableOpacity style={{width:'100%', elevation: 8,borderRadius: 10, paddingVertical: 15, paddingHorizontal: 12,backgroundColor:'#dc3545',}} /*onPress={getLogin}*/ onPress={() => navigation.navigate('Home')}>
                    <Text style={{fontSize:25, color:'white', fontWeight: "bold", alignSelf: 'center'}}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{fontSize:20,paddingTop:20}}>Chưa có tài khoản? <Text style = {{color:'blue',textDecorationLine:"underline"}} onPress={() => navigation.navigate('Register')}>Đăng ký ngay</Text></Text>
            </View>
        </SafeAreaView>
    )
}