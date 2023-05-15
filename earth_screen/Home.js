import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, Image, ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, { BottomSheetTextInput, BottomSheetBackdrop, } from '@gorhom/bottom-sheet';

const baseUrl = 'http://116.108.153.26/';

export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoad, setisLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const autoWidth = Dimensions.get("window").width;
  const [cmt, setCmt] = useState([]);
  const [show, setShow] = useState('');
  //bottomshet
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ['65%'], []);
  const [isOpen, setIsOpen] = useState(false);
  const handlePresent = (item) => {
    sheetRef.current && sheetRef.current.present();
    setCmt(item);
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  };

  //reload screen
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const api = baseUrl + 'Newsfeed/Post/561024910250495';
    fetch(api, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then((res) => res.json())
      .then((resJson) => { setData(resJson); setisLoad(false); })
      .catch((error) => { console.log(error); })
      .finally(() => setisLoad(false))
  }, []);

  return (
    <View style={{ flex: 1 }} >
      <View style={{ opacity: isOpen ? 0.4 : 1 }} onTouchStart={() => setIsOpen(false)}>
        <SafeAreaView style={{ flexDirection: 'row',justifyContent:"flex-start", alignItems: 'center', backgroundColor: '#fff' }}>
          <Text style={{fontSize: 28, fontWeight: 'bold',color:'#dc3545',paddingBottom:10,paddingLeft:10}}>Earth</Text>
        </SafeAreaView>
        {isLoad ? <ActivityIndicator size={"large"} style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }} /> : (
          <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {/* New post */}
            <View style={{ marginTop: 7, marginLeft: 7, marginRight: 7, borderRadius: 5, backgroundColor: '#fff', padding: 10, flexDirection: 'row' }}>
              <Image style={{ width: 45, height: 45 }} resizeMode="cover" source={{ uri: 'http://ativn.edu.vn/wp-content/uploads/2018/03/user.png' }}></Image>
              <TouchableOpacity style={{ paddingLeft: 5, justifyContent: "center", alignItems: 'center' }} onPress={() => navigation.navigate('Post')}>
                <Text style={{ fontSize: 20 }}>Bạn đang nghĩ gì vậy, Cong Danh ?</Text>
              </TouchableOpacity>
              <Ionicons name="image" size={35} color={'#dc3545'} style={{ marginLeft: '2%', marginTop: 3, }} />
            </View>

            {data.map((item, index) => {
              return (
                <View style={{ marginTop: 7, marginLeft: 7, marginRight: 7, borderRadius: 5, backgroundColor: '#fff', padding: 10, flexDirection: "column", }} key={index}>
                  <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('Single', { postId: item.postId })}>
                    <TouchableOpacity onPress={() => navigation.navigate('Acc', { userId: item.userId })}>
                      <Image style={{ width: 45, height: 45, borderRadius: 30 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                    </TouchableOpacity>
                    <View style={{ marginLeft: 5, }}>
                      <TouchableOpacity onPress={() => navigation.navigate('Acc', { userId: item.userId })}>
                        <Text style={{ fontSize: 20, }}>{item.fullName}</Text>
                      </TouchableOpacity>
                      <Text style={{ color: '#9a9a9a', }}>{item.datepost} ' {item.accessModifier == 'Công khai' ? <Ionicons name="earth" size={20} /> : <Ionicons name="people" size={20} />}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ marginTop: 5, }}>
                    <Text style={{ fontSize: 20, }}>{item.content}</Text>
                    <AutoHeightImage width={autoWidth - 34} style={{ marginTop: 5, }} resizeMode="contain" source={{ uri: item.image1 }}></AutoHeightImage>
                  </View>
                  <View style={{ marginTop: 5, flexDirection: 'row', }}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                      {item.liked == true ? <Ionicons name="heart" size={30} color={'#dc3545'} /> : <Ionicons name="heart-outline" size={30} color={'#dc3545'} />}
                      <Text style={{ fontSize: 20, }}>{item.like}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginHorizontal: 40 }} onPress={() => handlePresent(item.comment)}>
                      <Ionicons name="chatbox-ellipses-outline" size={30} />
                      <Text style={{ fontSize: 20, }}>{item.comment.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                      <Ionicons name="arrow-redo-outline" size={30} color={'blue'} />
                      <Text style={{ fontSize: 20, }}>{item.share}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        )}
      </View>
      {!isOpen ? null : (
        <BottomSheet keyboardBehavior="interactive" keyboardBlurBehavior="restore" backdropComponent={BottomSheetBackdrop} style={{ shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 15, elevation: 20 }} ref={sheetRef} snapPoints={snapPoints} enablePanDownToClose={true} onClose={() => setIsOpen(false)} backgroundStyle={{ borderRadius: 40, backgroundColor: '#e1e1e2' }} >
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}><Text style={{ fontSize: 23, fontWeight: '500', color: '#dc3545' }}>Bình luận</Text></View>
          <View style={{ marginHorizontal: 7, height: '77%' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {cmt.map((item, index) => {
                return (
                  <View style={{ flexDirection: "row", marginBottom: 13, marginRight: 45 }} key={index}>
                    <Image style={{ width: 45, height: 45, borderRadius: 25 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                    <View style={{ marginLeft: 7, paddingVertical: 7, paddingHorizontal: 11, backgroundColor: '#fff', borderRadius: 7 }}>
                      <Text style={{ fontSize: 20, fontWeight: '500' }}>{item.fullName}</Text>
                      <Text style={{ fontSize: 20 }}>{item.content}</Text>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 10, }}>
            <TouchableOpacity style={{ marginLeft: 5, justifyContent: "center", alignItems: 'center' }}>
              <Ionicons name="happy-outline" size={35} color={'#dc3545'} />
            </TouchableOpacity>
            <BottomSheetTextInput placeholder="Viết bình luận..." style={{ fontSize: 20, marginHorizontal: 10, width: '75%', backgroundColor: '#fff', borderRadius: 5, paddingVertical: 12, paddingHorizontal: 12 }} onChangeText={(text) => setShow(text)}></BottomSheetTextInput>
            {show ? (
              <TouchableOpacity style={{ marginLeft: 5, justifyContent: "center", alignItems: 'center' }}>
                <Ionicons name="rocket-outline" size={35} color={'#dc3545'} />
              </TouchableOpacity>
            ) : null}
          </View>
        </BottomSheet>
      )}
    </View>
  )
}
