import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAppContext } from "../../../../app-context/app.context";
import { globalFont } from "../../../../utils/const";

interface ICreateInvoie {
  reload: () => Promise<void>;
}

const CreateInvoiceModal = (props: ICreateInvoie) => {
  const { isNewInvoiceModalVisible, toggleNewInvoiceModal, addInvoice } = useAppContext();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddInvoice = async () => {
    if (!name) {
      alert('Không có tên!');
      return;
    }
    if (!phone) {
      alert('Không có SDT!');
      return;
    }
    await addInvoice({ name: name.trim(), phone: phone, invoiced: false });
    setName('');
    setPhone('');
    toggleNewInvoiceModal();
    await props.reload();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isNewInvoiceModalVisible}
      onRequestClose={() => {
        toggleNewInvoiceModal(null);
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          {/* form */}
          <View>
            <Text style={[globalFont.mainFont]}>
              Nhập tên: {name}
            </Text>
            <TextInput
              autoCapitalize="words"
              style={styles.input}
              placeholder="Tên"
              onChangeText={(input) => setName(input)}
            />
          </View>
          <View>
            <Text style={[globalFont.mainFont]}>
              Nhập SDT: {phone}
            </Text>
            <TextInput
              style={styles.input}
              keyboardType='numeric'
              placeholder="Số điện thoại"
              onChangeText={(input) => setPhone(input)}
            />
          </View>

          {/* button */}
          <View style={styles.buttonGroup}>
            <Pressable
              onPress={() => toggleNewInvoiceModal(null)}
              style={[styles.button, styles.buttonCancel]}
            >
              <Text>
                Huỷ
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonAdd]}
              onPress={handleAddInvoice}
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

export default CreateInvoiceModal;

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