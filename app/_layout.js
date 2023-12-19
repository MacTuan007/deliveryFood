import "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import CustomHeader from "@/Components/CustomHeader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Basket from "./basket";
import Filter from "./(modal)/filter";
import Page from "./home";
import LocationSearch from "./(modal)/location-search";
import Dish from "./(modal)/dish";
import Demodetails from "./(modal)/demodetails";
import Signin from "./signin";
import Index from "./index";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "login",
};
const Stack = createStackNavigator();
export default function RootLayoutNav() {
  const navigation = useNavigation();

  return (
    <BottomSheetModalProvider>
      <Stack.Navigator initialRouteName="index">
        <Stack.Screen name="index" component={Index} />
        <Stack.Screen
          component={Page}
          name="home"
          options={{
            header: () => <CustomHeader />,
          }}
        />
         <Stack.Screen
          component={Demodetails}
          name="(modal)/demodetails"
        />
        <Stack.Screen
          name="signin"
          component={Signin}
        />
        <Stack.Screen
          name="(modal)/filter"
          component={Filter}
          options={{
            presentation: "modal",
            headerTitle: "Filter",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.lightGrey,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modal)/location-search"
          component={LocationSearch}
          options={{
            presentation: "transparentModal",
            headerTitle: "Select location",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modal)/dish"
          component={Dish}
          options={{
            presentation: "modal",
            headerTitle: "",
            headerTransparent: true,

            headerLeft: () => (
              <TouchableOpacity
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  padding: 6,
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="basket"
          component={Basket}
          options={{
            headerTitle: "Basket",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons name="arrow-back" size={28} color={Colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </BottomSheetModalProvider>
  );
}
