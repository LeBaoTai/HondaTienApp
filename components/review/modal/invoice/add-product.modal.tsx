import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { useAppContext } from "../../../../app-context/app.context";
import { useState } from "react";

interface IAddProductToInvoice {
  products: [],
  reload: () => Promise<void>;
}

const AddProductToInvoiceModal = (props: any) => {
  const { allProducts, toggleAddProductToInvoice, isAddProductToInvoiceModalVisible, addProductToInvoice } = useAppContext();
  const [products, setProducts] = useState([]);

  // get all product on the bill
  const invoicedProduct = props.products.map(product => product.productId);

  // data have been remaped before rendered to the drop down
  const data = allProducts.map(item => ({
    value: item.name,
    key: [item.id, item.parentId],
    ...item
  }));

  // remove all product already on the bill
  const filteredData = data.filter((i) => !invoicedProduct.includes(i.id));

  const handleAddProduct = async () => {
    await addProductToInvoice(props.id, products);
    toggleAddProductToInvoice();
    setProducts([]);
    await props.reload();
  };

  return (
    <>
      <Modal
        animationType='fade'
        visible={isAddProductToInvoiceModalVisible}
        transparent={true}
        onRequestClose={() => {
          toggleAddProductToInvoice();
        }}
      >

        <View style={styles.wrapper}>
          <View style={styles.list}>
            <MultipleSelectList
              setSelected={(val) => setProducts(val)}
              data={filteredData}
              save="key"
              label="Sản phẩm đã chọn"
              boxStyles={{ marginTop: 25 }}
            />
          </View>
          <View style={styles.btn}>
            <Button
              onPress={() => toggleAddProductToInvoice()}
              title='      Huỷ      '
            />

            <Button
              onPress={() => handleAddProduct()}
              title='      Thêm      '
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AddProductToInvoiceModal;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    marginTop: 15,
    backgroundColor: '#fff',
    flex: 1
  },
  list: {
    flex: 1,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 25,
  }
});