import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { globalFont } from "../../../../utils/const";
import { useAppContext } from "../../../../app-context/app.context";

interface ICreateProduct {
  id: string,
  reload: () => Promise<void>;
}

const CreateProductModal = (props: ICreateProduct) => {
  const { isNewProductModalVisible, toggleNewProductModal, addProduct } = useAppContext();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleAddProduct = async () => {
    if (!productName) {
      alert('Không có tên!');
      return;
    }
    if (!productPrice) {
      alert('Không có giá!');
      return;
    }
    await addProduct(props.id, { name: productName.trim(), price: productPrice });
    setProductName('');
    setProductPrice('');
    toggleNewProductModal();
    await props.reload();
  };

  const formatMoney = (money) => {
    const formatter = new Intl.NumberFormat('fr-FR', {
      useGrouping: true,
    });

    return formatter.format(money);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isNewProductModalVisible}
        onRequestClose={() => {
          toggleNewProductModal();
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            {/* form */}
            <View>
              <Text style={[globalFont.mainFont]}>
                Nhập tên: {productName}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Tên"
                onChangeText={(input) => setProductName(input)}
              />
            </View>
            <View>
              <Text style={[globalFont.mainFont]}>
                Nhập giá: {formatMoney(productPrice)} VND
              </Text>
              <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder="Giá  "
                onChangeText={(input) => setProductPrice(input)}
              />
            </View>

            {/* button */}
            <View style={styles.buttonGroup}>
              <Pressable
                onPress={() => toggleNewProductModal(null)}
                style={[styles.button, styles.buttonCancel]}
              >
                <Text>
                  Huỷ
                </Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonAdd]}
                onPress={handleAddProduct}
              >
                <Text>
                  Thêm
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CreateProductModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },

  modalView: {
    margin: 20,
    padding: 35,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  input: {
    width: 200,
    padding: 10,
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 8,
  },

  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  button: {
    margin: 10,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },

  buttonCancel: {
    backgroundColor: '#F194FF',
  },
  buttonAdd: {
    backgroundColor: '#2196F3',
  }
});