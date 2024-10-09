import { Modal, View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { globalFont } from "../../../../utils/const";
import { useAppContext } from "../../../../app-context/app.context";
import { useContext, useState } from "react";

const UpdateInvoiceModal = () => {
  const { isUpdateInvoiceModalVisible, toggleUpdateInvoiceModal, invoiceToEdit } = useAppContext();
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleUpdateInvoie = () => {
    if (!newName) {
      alert("Không có tên!!!");
      return;
    } else if (!newPhone) {
      alert("Không có sdt!!!");
      return;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isUpdateInvoiceModalVisible}
      onRequestClose={() => {
        toggleUpdateInvoiceModal(null);
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
              placeholder={invoiceToEdit ? invoiceToEdit.name : ''}
              onChangeText={(input) => setNewName(input)}
            />
          </View>

          <View>
            <Text style={[globalFont.mainFont]}>
              Nhập SDT mới: {newPhone}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={invoiceToEdit ? invoiceToEdit.phone : ''}
              onChangeText={(input) => setNewPhone(input)}
              keyboardType='numeric'
            />
          </View>

          {/* button */}
          <View style={styles.buttonGroup}>
            <Pressable
              onPress={() => toggleUpdateInvoiceModal(null)}
              style={[styles.button, styles.buttonCancel]}
            >
              <Text>
                Huỷ
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonAdd]}
              onPress={handleUpdateInvoie}
            >
              <Text>
                Thêm
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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