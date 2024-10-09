import { useEffect } from "react"
import { useAppContext } from "../../../app-context/app.context";
import { Modal, StyleSheet, Text, View } from "react-native";
import { globalFont } from "../../../utils/const";

const LoadingModal = () => {
  const { loading } = useAppContext();

  return (

    <View style={styles.container}>
      <Modal
        visible={loading}
        animationType='fade'
      >
        <Text style={[globalFont.mainFont, styles.text]}>
          Đang tải... Vui lòng chờ...
        </Text>
      </Modal>
    </View>
  )
}

export default LoadingModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
  },
  text: {
    fontSize: 20,
    color: "Blue",
  }
})
