
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { globalFont } from "../../../../utils/const";
import { useAppContext } from "../../../../app-context/app.context";

interface IUpdateProduct {
  reload: () => Promise<void>;
}

const UpdateProductModal = (props: IUpdateProduct) => {
  const { isUpdateProductModalVisible, toggleUpdateProductModal, productToEdit, updateProduct } = useAppContext();
  const [newName, setNewName] = useState(productToEdit ? productToEdit.name : '');
  const [newPrice, setNewPrice] = useState(productToEdit ? productToEdit.price : '');

  const handleUpdateProduct = async () => {
    if (productToEdit) {
      await updateProduct(productToEdit.parrentId, productToEdit.id, newName.trim(), newPrice);
      toggleUpdateProductModal(null);
      await props.reload();
    }
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
        visible={isUpdateProductModalVisible}
        onRequestClose={() => {
          toggleUpdateProductModal(null);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            {/* form */}
            <View>
              <Text style={[globalFont.mainFont]}>
                Nhập tên mới: {newName}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={productToEdit ? productToEdit.name : ''}
                onChangeText={(input) => setNewName(input)}
              />
            </View>

            <View>
              <Text style={[globalFont.mainFont]}>
                Nhập giá mới: {formatMoney(newPrice)} VND
              </Text>
              <TextInput
                style={styles.input}
                placeholder={productToEdit ? productToEdit.price : ''}
                onChangeText={(input) => setNewPrice(input)}
                keyboardType='numeric'
              />
            </View>

            {/* button */}
            <View style={styles.buttonGroup}>
              <Pressable
                onPress={() => toggleUpdateProductModal(null)}
                style={[styles.button, styles.buttonCancel]}
              >
                <Text>
                  Huỷ
                </Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonAdd]}
                onPress={handleUpdateProduct}
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

export default UpdateProductModal;

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