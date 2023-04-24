import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, ScrollView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import axios from 'axios';
const baseUrl = 'https://reqres.in';
export default function Home() {
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* New post */}
        <View style={{ marginTop: 7, marginLeft: 7, marginRight: 7, borderRadius: 5, backgroundColor: '#fff', padding: 10, flexDirection: 'row' }}>
          <Image style={{ width: 45, height: 45 }} resizeMode="cover" source={{ uri: 'http://ativn.edu.vn/wp-content/uploads/2018/03/user.png' }}></Image>
          <TouchableOpacity>
            <Text style={{ fontSize: 20, marginLeft: 5, marginTop: 10, }}>Bạn đang nghĩ gì vậy, Cong Danh ?</Text>
          </TouchableOpacity>
          <Ionicons name="image" size={35} color={'#dc3545'} style={{ marginLeft: '2%', marginTop: 3, }} />
        </View>

        {/* Post */}
        <View style={{ marginTop: 7, marginLeft: 7, marginRight: 7, borderRadius: 5, backgroundColor: '#fff', padding: 10 , flexDirection:"column", }}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={{ width: 45, height: 45 }} resizeMode="cover" source={{ uri: 'http://ativn.edu.vn/wp-content/uploads/2018/03/user.png' }}></Image>
            <View>
              <TouchableOpacity>
                <Text style={{ fontSize: 20, marginLeft: 5, }}>Cong Danh</Text>
              </TouchableOpacity>
              <Text style={{ color: '#9a9a9a', marginLeft: 5, }}>01-01-2023</Text>
            </View>
          </View>
          <View style={{ marginTop: 5, }}>
            <Text style={{ fontSize: 20, }}>Anh Danh la số 1</Text>
            <Image style={{ marginTop: 5, width: '100%', height: 500 }} resizeMode="cover" source={{ uri: 'https://vcdn1-ngoisao.vnecdn.net/2023/02/26/tienng12-333124445-575480447823380-6342908261474459724-n-1677422090.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=KFRfRgAGrtTBYJ6sVwWZEQ' }}></Image>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}