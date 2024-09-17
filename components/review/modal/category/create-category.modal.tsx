import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { globalFont } from "../../../../utils/const";
import { useAppContext } from "../../../../AppContext";

const CreateCategoryModal = () => {
  const { isNewCategoryModalVisible, toggleNewCategoryModal, addCategory } = useAppContext();
  const [categoryName, setCategoryName] = useState('');


  const handleAddCategory = () => {
    addCategory(categoryName.trim());
    setCategoryName('');
    toggleNewCategoryModal();
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isNewCategoryModalVisible}
        onRequestClose={() => {
          toggleNewCategoryModal(null)
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            {/* form */}
            <View>
              <Text style={[globalFont.mainFont]}>
                Nhập tên thư mục mới:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Tên"
                onChangeText={(input) => setCategoryName(input)}
              />
            </View>

            {/* button */}
            <View style={styles.buttonGroup}>
              <Pressable
                onPress={() => toggleNewCategoryModal(null)}
                style={[styles.button, styles.buttonCancel]}
              >
                <Text>
                  Huỷ
                </Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonAdd]}
                onPress={handleAddCategory}
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
  )
}

export default CreateCategoryModal;

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
})