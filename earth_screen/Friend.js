import React, { useState, useEffect, } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, Image, useWindowDimensions, ActivityIndicator, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

export default function Friend({ navigation }) {
    const baseUrl = 'http://116.108.153.26/';
    const [listReq, setListReq] = useState([]);
    const [listNewFri, setListNewFri] = useState([]);
    const [listFri, setListFri] = useState([]);
    const [isLoad, setisLoad] = useState(true);

    useEffect(() => {
        const api = baseUrl + 'Newsfeed/NewFriend/561024910250495';
        fetch(api, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((resJson) => { setListNewFri(resJson); })
            .catch((error) => { console.log(error); })

        const req = baseUrl + 'Newsfeed/FriendRequest/561024910250495';
        fetch(req, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((resJson) => { setListReq(resJson); })
            .catch((error) => { console.log(error); })

        const fri = baseUrl + 'Account/MyFriend/561024910250495';
        fetch(fri, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((resJson) => { setListFri(resJson); setisLoad(false) })
            .catch((error) => { console.log(error); })
            .finally(() => setisLoad(false))
    }, []);

    const FirstRoute = () => (
        <SafeAreaView style={{ flex: 1, marginVertical: 7, marginHorizontal: 7, }}>
            <View style={{ flexDirection: "row", backgroundColor: '#fff', marginBottom: 7, borderRadius: 5 }}>
                <Ionicons name="search" size={35} color={'#dc3545'} style={{ marginLeft: '2%', marginTop: 3, }} />
                <TextInput placeholder="Tìm kiếm..." fontSize={20} width={"80%"}></TextInput>
            </View>
            {isLoad ? <ActivityIndicator size={"large"} style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }} /> : (
                <ScrollView style={{ borderRadius: 5, marginBottom: 7, backgroundColor: '#fff', padding: 10, }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Danh sách bạn bè</Text>
                    {listFri.map((item, index) => {
                        return (
                            <View style={{ flexDirection: "row", marginTop: 7 }} key={index}>
                                <TouchableOpacity onPress={() => navigation.navigate('Acc', { userId: item.userId })}>
                                    <Image style={{ width: 60, height: 60 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                                </TouchableOpacity>
                                <View width="100%" marginLeft={7} >
                                    <TouchableOpacity onPress={() => navigation.navigate('Acc', { userId: item.userId })}><Text style={{ fontSize: 20, marginBottom: 7 }}>{item.fullName}</Text></TouchableOpacity>
                                    <View style={{ flexDirection: "row", }}>
                                        <TouchableOpacity style={{ backgroundColor: '#dc3545', paddingVertical: 6, paddingHorizontal: 44, borderRadius: 10 }} onPress={() => navigation.navigate('Chat', { userId: item.userId, online: item.status, name: item.fullName, ava: item.avatar })}>
                                            <Text style={{ fontSize: 20, color: '#fff' }}>Nhắn tin</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            )}
        </SafeAreaView>
    );

    const SecondRoute = () => (
        <SafeAreaView style={{ flex: 1, marginVertical: 7, marginHorizontal: 7, }}>
            {/* Loi moi ket ban */}
            <ScrollView style={{ borderRadius: 5, marginBottom: 7, backgroundColor: '#fff', padding: 10, }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Lời mời kết bạn</Text>
                {listReq.map((item, index) => {
                    return (
                        <View style={{ flexDirection: "row", marginTop: 7 }} key={index}>
                            <TouchableOpacity onPress={() => navigation.navigate('Acc', { userId: item.userId })}>
                                <Image style={{ width: 60, height: 60 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                            </TouchableOpacity>
                            <View width="100%" marginLeft={7} >
                                <TouchableOpacity onPress={() => navigation.navigate('Acc', { userId: item.userId })}><Text style={{ fontSize: 20, marginBottom: 7 }}>{item.fullName}</Text></TouchableOpacity>
                                <View style={{ flexDirection: "row", }}>
                                    <TouchableOpacity style={{ backgroundColor: '#34a853', paddingHorizontal: 30, paddingVertical: 6, marginRight: 15, borderRadius: 10 }}>
                                        <Text style={{ fontSize: 20, color: '#fff' }}>Đồng ý</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: '#dc3545', paddingVertical: 6, paddingHorizontal: 44, borderRadius: 10 }}>
                                        <Text style={{ fontSize: 20, color: '#fff' }}>Hủy</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
            {/* goi y ket ban */}
            <ScrollView style={{ borderRadius: 5, backgroundColor: '#fff', padding: 10, }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Gợi ý kết bạn</Text>
                {listNewFri.map((item, index) => {
                    return (
                        <View style={{ flexDirection: "row", marginTop: 7 }} key={index}>
                            <TouchableOpacity onPress={() => navigation.navigate('Acc', { userId: item.userId })}>
                                <Image style={{ width: 60, height: 60 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                            </TouchableOpacity>
                            <View marginLeft={7} >
                                <TouchableOpacity onPress={() => navigation.navigate('Acc', { userId: item.userId })}><Text style={{ fontSize: 20, marginBottom: 7 }}>{item.fullName}</Text></TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#228dbb', paddingHorizontal: 35, paddingVertical: 6, marginRight: 15, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 20, color: '#fff' }}>Gửi kết bạn</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Bạn bè' },
        { key: 'second', title: 'Tương tác' },
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'black'}
            inactiveColor={'black'}
            indicatorStyle={{ backgroundColor: '#dc3545' }}
            labelStyle={{}}
            style={{ backgroundColor: '#fff' }}
        />
    );
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={SceneMap({
                first: FirstRoute,
                second: SecondRoute,
            })}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
    )
}