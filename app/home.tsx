import { Text, ScrollView, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import Categories from '../Components/Categories';
import { SafeAreaView } from 'react-native-safe-area-context';
import Restaurants from '../Components/Restaurants';
import Colors from '@/constants/Colors';
import firestore, { firebase } from '@react-native-firebase/firestore'


const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Categories />
        <Text style={styles.header}>Những món ăn được lựa chọn nhiều nhất</Text>
        <Restaurants />
        <Text style={styles.header}>Gợi ý gần bạn</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 50,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});

export default Page;
