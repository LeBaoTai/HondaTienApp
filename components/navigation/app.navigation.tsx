import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { INTER_REGULAR, LOBSTER_REGULAR } from '../../utils/const';
import AboutScreen from "../review/about";
import CategoryScreen from "../review/category";
import HomeScreen from "../review/home";
import ProductScreen from "../review/product";
import AppHeader from "./app.header";

const HomeLayout = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          header: () => <AppHeader headerTitle='Honda Tiến' />
        }}
      />

      <Stack.Screen
        name='CategoryScreen'
        component={CategoryScreen}
        options={{
          title: "Bảng giá",
          headerTitleStyle: {
            fontFamily: LOBSTER_REGULAR,
          },
        }}
      />

      <Stack.Screen
        name='ProductScreen'
        component={ProductScreen}
        options={{
          title: "Chi tiết",
          headerTitleStyle: {
            fontFamily: LOBSTER_REGULAR,
          },
        }}
      />
    </Stack.Navigator>
  )
}

const AppNavigation = () => {
  const Drawer = createDrawerNavigator<RootStackParamList>();
  return (
    <Drawer.Navigator
    >
      <Drawer.Screen
        name="HomeLayout"
        options={{
          title: "Trang chủ",
          drawerLabelStyle: { fontFamily: INTER_REGULAR },
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
        }}
        component={HomeLayout}
      />
      <Drawer.Screen
        name="AboutScreen"
        options={{
          title: "Chi tiết",
          drawerLabelStyle: { fontFamily: INTER_REGULAR },
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons name="details" size={24} color="black" />
          ),
          header: () => <AppHeader headerTitle={"Chi tiết"} />
        }}
        component={AboutScreen}
      />
    </Drawer.Navigator>
  )
}

export default AppNavigation;