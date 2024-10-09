import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../../app-context/app.context";
import AddProductToInvoiceModal from "./modal/invoice/add-product.modal";

interface IProduct {
  invoiceId: string,
  id: string,
  productId: string,
  name: string,
  price: number,
  amount: number;
  reload: () => Promise<void>;
}

const Product = (props: IProduct) => {

  const { increaseProduct, decreaseProduct, deleteFromInvoice } = useAppContext();

  const handleIncrease = async () => {
    await increaseProduct(props.invoiceId, props.id, props.amount + 1);
    await props.reload();
  };

  const handleDecrease = async (amount) => {
    if (amount === 0) {
      Alert.alert(
        'Xoá sản phẩm',
        'Sản phẩm này sẽ bị xoá khỏi hoá đơn!!',
        [
          {
            text: 'Huỷ',
            style: 'cancel',
          },
          {
            text: 'OK', onPress: async () => {
              await deleteFromInvoice(props.invoiceId, props.id);
              await props.reload();
            }
          },
        ]
      );
      return;
    }
    await decreaseProduct(props.invoiceId, props.id, amount);
    await props.reload();
  };

  const handleDelete = async () => {
    await deleteFromInvoice(props.invoiceId, props.id);
    await props.reload();
  };

  const formatMoney = (money) => {
    const formatter = new Intl.NumberFormat('fr-FR', {
      useGrouping: true,
    });

    return formatter.format(money);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row', height: 50, alignItems: 'center' }}>
      <Text style={{ flex: 2 }}>
        {props.name}
      </Text>
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: "space-around", alignItems: 'center' }}>
        <TouchableOpacity onPress={() => handleDecrease(props.amount - 1)}>
          <View style={{ borderWidth: 1, borderRadius: 4, padding: 5 }}>
            <Text>-</Text>
          </View>
        </TouchableOpacity>
        <Text >
          {props.amount || 0}
        </Text>
        <TouchableOpacity onPress={() => handleIncrease()}>
          <View style={{ borderWidth: 1, borderRadius: 4, padding: 5 }}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={{ flex: 1.5, textAlign: 'right' }}>
        {formatMoney(props.price)}
      </Text>
      <Text style={{ flex: 1.5, textAlign: 'right' }}>
        {formatMoney(props.price * props.amount)}
      </Text>
      <View>
        <Button onPress={() => { handleDelete(); }} title="X" />
      </View>
    </View >
  );
};

const productStyles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  archiveButton: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const InvoiceDetail = () => {
  const route: RouteProp<RootStackParamList, 'InvoiceDetailScreen'> = useRoute();
  const { toggleAddProductToInvoice, fetchProductsFromInvoice } = useAppContext();
  const [count, setCount] = useState(0);
  const [totalMoney, setTotalMoney] = useState();
  const [products, setProducts] = useState([]);

  const props = route.params;

  const fetchProductsFromInvoiceToRender = async () => {
    const fetchedProducts = await fetchProductsFromInvoice(props.id);
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    fetchProductsFromInvoiceToRender();
  }, [props.id]);

  useEffect(() => {
    const c = products.reduce((acc, cur) => acc + cur.amount, 0);
    setCount(c);
  }, [products]);

  useEffect(() => {
    const c = products.reduce((acc, cur) => acc + Number.parseInt(cur.price) * Number.parseInt(cur.amount), 0);
    setTotalMoney(c);
  }, [products]);

  const formatMoney = (money) => {
    const formatter = new Intl.NumberFormat('fr-FR', {
      useGrouping: true,
    });

    return formatter.format(money);
  };

  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <Text>
          Tên khách hàng: <Text style={{ fontSize: 20 }}>{props.name}</Text>
        </Text>
        <Text>
          SDT: <Text style={{ fontSize: 19 }}>{props.phone}</Text>
        </Text>
        <Button
          title="Thêm sản phẩm mới vào hoá đơn"
          onPress={() => toggleAddProductToInvoice()}
        />
      </View>
      <View style={styles.items}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.productId}
          renderItem={
            ({ item }) => {
              return (
                <View style={flatListStyle.item}>
                  <Product
                    {...item}
                    reload={fetchProductsFromInvoiceToRender}
                  />
                </View>
              );
            }
          }
        />
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={{ fontSize: 17 }}>Tổng sản phẩm: <Text style={{ color: 'red' }}>{count || 0}</Text></Text>
          <Text style={{ fontSize: 17 }}>Tổng tiền: <Text style={{ color: 'red' }}>{formatMoney(totalMoney) || 0} </Text></Text>
        </View>
        <Button
          onPress={() => alert('rint')}
          title="In hoá đơn"
        />
      </View>
      <AddProductToInvoiceModal id={props.id} reload={fetchProductsFromInvoiceToRender} products={products}/>
    </View>
  );
};

export default InvoiceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  detail: {
    alignItems: "center",
  },
  items: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: 'mageta',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  }
});


const flatListStyle = StyleSheet.create({
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  item: {
    flexDirection: 'row',
  }
});