import { useState } from "react";
import { View, Modal, TextInput, Pressable, StyleSheet, Text, Button } from "react-native";
import { globalFont } from "../../../../utils/const";
import { useAppContext } from "../../../../AppContext";

const RenameCategoryModal = () => {
  const { isChangeNameModalVisible, categoryToEdit, toggleChangeCategoryNameModal, updateCategoryName } = useAppContext();
  const [newName, setNewName] = useState(categoryToEdit ? categoryToEdit.name : '');

  
  const handleChangeName = () => {
    if (categoryToEdit) {
      updateCategoryName(categoryToEdit.id, newName.trim());
      setNewName('');
      toggleChangeCategoryNameModal(null);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isChangeNameModalVisible}
      onRequestClose={() => {
        toggleChangeCategoryNameModal(null)
      }}
    >
      <View style={modalSt.container}>
        <View style={modalSt.modalView}>
          {/* form */}
          <View>
            <Text style={[globalFont.mainFont]}>
              Nhập tên mới:
            </Text>
            <TextInput
              style={modalSt.input}
              placeholder={categoryToEdit ? categoryToEdit.name : ''}
              value={newName}
              onChangeText={setNewName}
            />
          </View>

          {/* button */}
          <View style={modalSt.buttonGroup}>
            <Pressable
              onPress={() => toggleChangeCategoryNameModal(null)}
              style={[modalSt.button, modalSt.buttonCancel]}
            >
              <Text>
                Huỷ
              </Text>
            </Pressable>

            <Pressable
              style={[modalSt.button, modalSt.buttonAdd]}
              onPress={handleChangeName}
            >
              <Text>
                Thay đổi
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RenameCategoryModal;

const modalSt = StyleSheet.create({
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