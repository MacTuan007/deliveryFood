import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import DataDetails from "./datadetails";

const Demodetails = () => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const fetchPost = async () => {
    await firestore()
      .collection("restaurant")
      .get()
      .then((querySnapshot) => {
        const restaurantData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
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
      {restaurants.map((restaurant:any) => (
        <DataDetails
          key={restaurant.id}
          restaurant={restaurants}
          selectedDocument={selectedDocument}
          onDocumentSelect={setSelectedDocument}
        />
      ))}
    </>
  );
};

export default Demodetails;

const styles = StyleSheet.create({});
