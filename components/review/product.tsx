import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useAppContext } from '../../AppContext';
import CreateProductModal from './modal/product/create-product.modal';
import ProductItem from '../item/product.item';
import UpdateProduct from './modal/product/update-product.modal';

const ProductScreen = () => {
	const route: RouteProp<RootStackParamList, 'ProductScreen'> = useRoute();
	const { toggleNewProductModal, fetchProducts } = useAppContext();
	const [searchProductTerm, setSearchProductTerm] = useState('');
	const [products, setProducts] = useState([]);
	const props = route.params;

	const loadProducts = async () => {
		const fetchedProducts = await fetchProducts(props.id);
		setProducts(fetchedProducts);
	};

	useEffect(() => {
		loadProducts();
	}, [props.id]);

	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchProductTerm.toLowerCase())
	);

	return (
		<View style={styles.container}>
			{/* search block */}
			<View style={searchBlockSt.searchBlock}>
				<View style={searchBlockSt.searchBox}>
					<TextInput
						style={searchBlockSt.searchBar}
						onChangeText={(input) => setSearchProductTerm(input)}
					/>
					<Feather
						name="search" size={20}
						color="black"
						style={searchBlockSt.icon} />
				</View>

				<View style={searchBlockSt.icon}>
					<AntDesign
						name="addfile"
						size={20}
						color="black"
						onPress={() => toggleNewProductModal(true)}
					/>
				</View>
			</View>

			<FlatList
				data={filteredProducts}
				keyExtractor={(item) => item.id.toString()}
				renderItem={
					({ item }) => {
						return (
							<View>
								<ProductItem
									name={item.name}
									price={item.price}
									id={item.id}
									parrentId={props.id}
									reload={loadProducts}
								/>
							</View>
						);
					}
				}
			/>
			<CreateProductModal id={props.id} reload={loadProducts} />
			<UpdateProduct reload={loadProducts} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

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

export default ProductScreen;