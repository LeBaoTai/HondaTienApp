import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useAppContext } from "../../app-context/app.context";
import CategoryItem from "../item/category.item";
import CreateCategoryModal from "./modal/category/create-category.modal";
import RenameCategoryModal from "./modal/category/rename-category.modal";


const CategoryScreen = () => {
	const { toggleNewCategoryModal, fetchCategories } = useAppContext();
	const [searchTerm, setSearchTerm] = useState('');
	const [categories, setCategories] = useState([]);

	const fetchCategoriesToRender = async () => {
		const fetchedCategories = await fetchCategories();
		setCategories(fetchedCategories);
	};

	const filteredCategories = categories.filter(category =>
		category.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	useEffect(() => {
		fetchCategoriesToRender();
	}, []);

	return (
		<View style={styles.container}>
			{/* search block */}
			<View style={searchBlockSt.searchBlock}>
				<View style={searchBlockSt.searchBox}>
					<TextInput
						style={searchBlockSt.searchBar}
						onChangeText={(input) => setSearchTerm(input)}
					/>
					<Feather
						name="search" size={20}
						color="black"
						style={searchBlockSt.icon} />
				</View>

				<View style={searchBlockSt.icon}>
					<AntDesign
						name="addfolder"
						size={20}
						color="black"
						onPress={() => toggleNewCategoryModal()}
					/>
				</View>
			</View>

			<FlatList
				data={filteredCategories}
				keyExtractor={(item) => item.id.toString()}
				renderItem={
					({ item }) => {
						return (
							<View>
								<CategoryItem
									{...item}
									reload={fetchCategoriesToRender}
								/>
							</View>
						);
					}
				}
			/>
			<RenameCategoryModal reload={fetchCategoriesToRender} />
			<CreateCategoryModal reload={fetchCategoriesToRender} />
		</View>
	);
};


const searchBlockSt = StyleSheet.create({
	searchBlock: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		paddingHorizontal: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	searchBox: {
		flex: 1,
		flexDirection: 'row',
		borderWidth: 1,
		marginRight: 10,
		marginVertical: 10,
		alignItems: "center",
		justifyContent: 'space-between',
		borderRadius: 8,
	},
	searchBar: {
		flex: 1,
		paddingVertical: 5,
		marginLeft: 2,
	},
	icon: {
		marginHorizontal: 10,
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default CategoryScreen;