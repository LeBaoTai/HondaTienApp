import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppContext } from "../../AppContext";
import { globalFont } from "../../utils/const";



const CategoryItem = (props: any) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const { deleteCategory, toggleChangeCategoryNameModal } = useAppContext();

  const handleDeletePress = () => {
    Alert.alert(
      'Xoá thư mục',
      'Xoá thư mục sẽ xoá toàn bộ các thành phần bên trong!!',
      [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => deleteCategory(props.id) },
      ]
    );
  }

  return (
    <>
      <Pressable
        onPress={() => navigation.navigate('ProductScreen', { name: props.name, id: props.id })}
      >
        <View style={styles.blockItem}>
          <Text style={[globalFont.mainFont, { fontSize: 19 }]}>
            {props.name}
          </Text>
          <View>
            <Pressable
              onPress={() => toggleChangeCategoryNameModal(props)}
            >
              <Text style={{ marginBottom: 2, color: 'blue', textDecorationLine: 'underline' }}>
                Sửa
              </Text>
            </Pressable>

            <Pressable
              onPress={handleDeletePress}
            >
              <Text style={{ marginTop: 2, color: 'red', textDecorationLine: 'underline' }}>
                Xoá
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </>
  );
}

export default CategoryItem;

const styles = StyleSheet.create({
  blockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#fff',

    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});


