import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { restaurants } from "@/assets/data/home";
import { Link } from "expo-router";
import Colors from "../constants/Colors";
import firestore from "@react-native-firebase/firestore";

// const data = {
//   name: 'Vapiano',
//   rating: '4.5 Excellent',
//   ratings: '(1500+)',
//   distance: '0.85 miles away',
//   delivery: '10-30 min',
//   tags: ['Italian', 'Pizza', 'Pasta', 'Salads', 'Vegetarian', 'Alcohol', 'Wine', 'Vegan Friendly'],
//   about: 'The home of handmade fresh pasta, thin crust pizza, protein packed salads, homemade sauces and dressings too. Choose your pasta shape and add any extras you like.',
//   food: [
//     {
//       category: 'Meal Deals',
//       meals: [
//         {
//           id: 1,
//           name: 'Pasta Power ✊',
//           price: 17,
//           info: 'Includes one garlic bread, one pasta and one soft drink.',

//         },
//       ],
//     },
//   ],
// };

// firestore()
//   .collection('restaurant')
//   .doc('sdRhBYjU1rwFXuQQY8jY')
//   .set(data);

const Restaurants = () => {
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
        //console.log(restaurants, restaurantData);
      });
  };
  useEffect(() => {
    fetchPost();
  }, []);


  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      {restaurants.map((restaurant, index) => (
        <Link href={"/demodetails"} key={index} asChild>
          <TouchableOpacity>
            <View style={styles.categoryCard}>
              <Image source={{uri:restaurant.img}} style={styles.image} />
              <View style={styles.categoryBox}>
                <Text style={styles.categoryText}>{restaurant.name}</Text>
                <Text style={{ color: Colors.green }}>
                  {restaurant.rating} ⭐ ({restaurant.ratings} +)
                </Text>
                <Text style={{ color: Colors.medium, marginTop: 2 }}>
                  Khoảng cách: {restaurant.distance}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
    backgroundColor: "#fff",
    marginEnd: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  categoryText: {
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    flex: 5,
    width: undefined,
    height: undefined,
  },
  categoryBox: {
    flex: 2,
    padding: 10,
  },
});

export default Restaurants;
