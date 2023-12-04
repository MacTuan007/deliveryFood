import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import DataDetails from './datadetails';

const demodetails = () => {
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const fetchPost = async () => {
      await firestore()
        .collection("restaurant")
        .get()
        .then((querySnapshot) => {
          const restaurantData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setRestaurants(restaurantData);
        });
    };

    useEffect(() => {
        fetchPost();
      }, []);


  return (
    <>
      {restaurants.map((restaurant : any) => (
        <DataDetails restaurant={restaurant} />
      ))}
    </>
  )
}

export default demodetails

const styles = StyleSheet.create({})