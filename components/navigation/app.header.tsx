import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, View } from "react-native";
import { globalFont } from "../../utils/const";
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

interface IProps {
  headerTitle: string | undefined;
}

const AppHeader = (props: IProps) => {
  const navigation: any = useNavigation();
  const {headerTitle} = props;

  return (
    <View style={styles.container}>
      <StatusBar style='dark' hidden={false} />
      <Feather name="menu" size={24} color="black" onPress={() => navigation.openDrawer()} />
      <Text style={[styles.headetText, globalFont.headerFont]}>
        {headerTitle}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  headetText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
  statusBar: {

  },
})

export default AppHeader;