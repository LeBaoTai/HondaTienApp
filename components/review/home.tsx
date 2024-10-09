import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { globalFont } from "../../utils/const";


const HomeScreen = () => {
	const navigation: NavigationProp<RootStackParamList> = useNavigation();

	return (
		<View style={styles.container}>
			<Pressable
				onPress={() => navigation.navigate('CategoryScreen')}
			>
				<View style={styles.blockItem}>
					<Text style={globalFont.titleFont}>
						Bảng giá
					</Text>
				</View>
			</Pressable>

			<Pressable
				onPress={() => navigation.navigate('InvoiceScreen')}
			>
				<View style={styles.blockItem}>
					<Text style={globalFont.titleFont}>
						Hoá đơn
					</Text>
				</View>
			</Pressable>


			<Pressable
				onPress={() => alert('Nhật ký')}
			>
				<View style={styles.blockItem}>
					<Text style={globalFont.titleFont}>
						Nhật ký
					</Text>
				</View>
			</Pressable>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
	},

	blockItem: {
		backgroundColor: '#fff',
		borderRadius: 8,
		margin: 10,
		padding: 35,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 3,
	},
});

export default HomeScreen;