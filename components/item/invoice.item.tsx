import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppContext } from "../../app-context/app.context";
import { useInvoiceContext } from "../../app-context/invoice.context";
import { globalFont } from "../../utils/const";

interface IInvoiceItem {
  id: string;
  name: string;
  phone: string;
  products: [];
  isPrint: boolean;
  reload: () => Promise<void>;
}

const InvoiceItem = (props: IInvoiceItem) => {

  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const { deleteInvoice } = useAppContext();
  const { toggleUpdateInvoiceModal } = useInvoiceContext();

  const handleDeletePress = () => {
    Alert.alert(
      'Xoá hoá đơn',
      'Hoá đơn sẽ bị xoá vĩnh viễn!!!',
      [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {
          text: 'OK', onPress: async () => {
            await deleteInvoice(props.id);
            await props.reload();
          }
        },
      ]
    );
  };

  return (
    <>
      <Pressable
        onPress={() => navigation.navigate('InvoiceDetailScreen', { ...props })}
      >
        <View style={styles.blockItem}>
          <View>
            <Text style={{ textDecorationLine: props.isPrint ? "line-through" : "none" }}>
              Tên:
              <Text style={[globalFont.mainFont, { fontSize: 19 }]}>
                {props.name}
              </Text>
            </Text>
            <Text style={{ textDecorationLine: props.isPrint ? "line-through" : "none" }}>
              SDT:
              <Text style={{ color: 'green', fontSize: 18 }}>
                {props.phone}
              </Text>
            </Text>
          </View>
          <View>
            <Pressable
              onPress={() => toggleUpdateInvoiceModal()}
            >
              <Text style={{ marginBottom: 2, color: 'blue', textDecorationLine: 'underline' }}>
                Sửa
              </Text>
            </Pressable>

            <Pressable
              onPress={() => handleDeletePress()}
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
};

export default InvoiceItem;

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