import React, { useState, useEffect, } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, Image, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home({ navigation }) {
    const baseUrl = 'http://116.108.153.26/';
    const [friend, setFriend] = useState([]);
    const [isLoad, setisLoad] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    //list friend
    useEffect(() => {
        this.interval = setInterval(() => {
            const api = baseUrl + 'Account/MyFriend/' + '561024910250495';
            fetch(api, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
                .then((res) => res.json())
                .then((resJson) => { setFriend(resJson); })
                .catch((error) => { console.log(error); })
        }, 500);
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#dc3545', paddingBottom: 10, paddingLeft: 10 }}>Tin nhắn</Text>
            </SafeAreaView>
            {/* danh sach ban be */}
            <View style={{ backgroundColor: '#fff', margin: 7, padding: 7, borderRadius: 5 }}>
                <Text style={{ fontSize: 20, marginBottom: 7 }}>Bạn bè</Text>
                <ScrollView horizontal={true}>
                    {friend.map((item, index) => {
                        return (
                            <View style={{ flexDirection: 'row' }} key={index}>
                                <TouchableOpacity style={{ marginRight: 7, }} onPress={() => navigation.navigate('Chat', { userId: item.userId, online: item.status, name: item.fullName, ava: item.avatar })}>
                                    <Image style={{ width: 55, height: 55 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                                    {item.status == false ? undefined : <Ionicons style={{ position: "absolute", left: '67%', top: '67%' }} name="ellipse-sharp" size={19} color={'#00cc00'} />}

                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>

            {/* danh sach chat */}
            <View style={{ backgroundColor: '#fff', margin: 7, padding: 7, borderRadius: 5 }}>
                <Text style={{ fontSize: 20, marginBottom: 7 }}>Đoạn chat</Text>
            </View>
        </View>
    )
}