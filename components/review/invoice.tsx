import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useAppContext } from "../../AppContext";
import InvoiceItem from "../item/invoice.item";

const InvoiceScreen = () => {
  const { allProducts } = useAppContext();

  return (
    <View style={styles.container}>
      <Text>Hoa don</Text>
      <FlatList
        data={allProducts}
        keyExtractor={(item) => item.id}
        renderItem={
          ({ item }) => {
            return (
              <InvoiceItem
                name={item.name}
                price={item.price}
              />
            );
          }
        }
      />
      <View style={styles.btn}>
        <Button
          onPress={() => alert('tao')}
          title="Tao"
        />
      </View>
    </View>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  btn: {
    padding: 20,
    backgroundColor: '#ccc'
  }
});