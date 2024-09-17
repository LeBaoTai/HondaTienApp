import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppContext } from "../../AppContext";
import { globalFont } from "../../utils/const";

const ProductItem = (props: any) => {
  const { toggleUpdateProductModal, deleteProduct } = useAppContext();

  const handleDeletePress = () => {
    Alert.alert(
      'Xoá sản phẩm',
      'Sản phẩm sẽ bị xoá vĩnh viễn!!!',
      [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            deleteProduct(props.parrentId, props.id);
            props.reload()
          }
        },
      ]
    );
  };

  const formatMoney = (money) => {
    const formatter = new Intl.NumberFormat('fr-FR', {
      useGrouping: true,
    });

    return formatter.format(money);
  };

  return (
    <>
      <View style={styles.blockItem}>
        <View>
          <Text style={[globalFont.mainFont, { fontSize: 19 }]}>
            {props.name}
          </Text>
          <Text style={{ color: 'red' }}>
            {formatMoney(props.price)} VND
          </Text>
        </View>
        <View>
          <Pressable
            onPress={() => toggleUpdateProductModal(props)}
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
    </>
  );
};

export default ProductItem;

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