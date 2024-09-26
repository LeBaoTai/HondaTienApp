import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, app, collection, addDoc, doc, updateDoc, deleteDoc, getDocs, where, query } from './firebase/config';

// Create context
const AppContext = createContext(undefined);

// Create a provider component
export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isNewCategoryModalVisible, setNewCategoryModalVisible] = useState(false);
  const [isChangeNameModalVisible, setChangeNameModalVisible] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);


  // PRODUCT SESSION
  const [productToEdit, setProductToEdit] = useState(null);
  const [isNewProductModalVisible, setNewProductModalVisible] = useState(false);
  const [isUpdateProductModalVisible, setUpdateProductModalVisible] = useState(false);

  // LOADING 
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      // start loading
      setLoading(true);

      const querySnapshot = await getDocs(collection(db, 'categories'));

      const categoriesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Set the fetched categories in the local state
      setCategories(categoriesList);
    } catch (e) {
      console.error('Error fetching categories: ', e);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (categoryName) => {
    try {

      // loading
      setLoading(true);

      // Add to Firestore
      await addDoc(collection(db, 'categories'), {
        name: categoryName
      });

      fetchCategories();
    } catch (e) {
      console.error('Error adding category: ', e);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      // set loading
      setLoading(true);

      // Reference to the products subcollection
      const productsRef = collection(db, 'categories', categoryId, 'products');

      // Fetch all products in the category
      const productDocs = await getDocs(productsRef);

      // Delete each product document in the subcollection
      const deletePromises = productDocs.docs.map((productDoc) =>
        deleteDoc(doc(db, 'categories', categoryId, 'products', productDoc.id))
      );

      // Wait for all products to be deleted
      await Promise.all(deletePromises);

      // Delete the category document itself
      await deleteDoc(doc(db, 'categories', categoryId));

      // Update local state
      fetchCategories();
    } catch (e) {
      console.error('Error deleting category: ', e);
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryName = async (categoryId, newName) => {
    try {
      setLoading(true);
      const categoryRef = doc(db, 'categories', categoryId);

      await updateDoc(categoryRef, { name: newName });

      // Update local state
      fetchCategories();
    } catch (e) {
      console.error('Error updating category name: ', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleNewCategoryModal = () => {
    setNewCategoryModalVisible((prev) => !prev);
  };

  const toggleChangeCategoryNameModal = (category = null) => {
    setCategoryToEdit(category);
    setChangeNameModalVisible((prev) => !prev);
  };

  // Product management functions

  const toggleNewProductModal = () => {
    setNewProductModalVisible((prev) => !prev);
  };

  const toggleUpdateProductModal = (product = null) => {
    setProductToEdit(product);
    setUpdateProductModalVisible((prev) => !prev);
  };

  const fetchProducts = async (categoryId) => {
    try {
      // set loading
      setLoading(true);

      // Query the products subcollection for the specific category
      const productsCollection = collection(db, 'categories', categoryId, 'products');
      const productQuery = query(productsCollection);
      const querySnapshot = await getDocs(productQuery);

      // Map the documents to an array of product data
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return products;

    } catch (e) {
      console.error('Error fetching products: ', e);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (categoryId, newProduct) => {
    try {
      setLoading(true);
      await addDoc(collection(db, 'categories', categoryId, 'products'), newProduct);
    } catch (e) {
      console.log("Error creating product: ", e);
    } finally {
      setLoading(false);
    }
  };


  const deleteProduct = async (categoryId, productId) => {
    try {
      setLoading(true);
      // Get a reference to the specific product document
      const productRef = doc(db, 'categories', categoryId, 'products', productId);

      // Delete the product document
      await deleteDoc(productRef);

    } catch (e) {
      console.error('Error deleting product: ', e);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (categoryId, productId, newName, newPrice) => {
    const updatedFields = { name: newName, price: newPrice };

    try {
      setLoading(true);
      // Get a reference to the specific product document
      const productRef = doc(db, 'categories', categoryId, 'products', productId);

      // Update the product document
      await updateDoc(productRef, updatedFields);

    } catch (e) {
      console.error('Error updating product: ', e);
    } finally {
      setLoading(false);
    }
  };

  // ALL PRODUCT SESSIONS 
  // Function to fetch all products from all categories
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const categoriesCollection = collection(db, 'categories'); // Collection for categories
      const categoriesSnapshot = await getDocs(categoriesCollection); // Get all categories
      let allProducts = []; // Array to hold all products

      // Loop through each category
      for (const categoryDoc of categoriesSnapshot.docs) {
        const categoryId = categoryDoc.id; // Get category ID
        const productsCollection = collection(db, `categories/${categoryId}/products`); // Reference to the products collection of this category
        const productsSnapshot = await getDocs(productsCollection); // Get products in this category

        // Add each product to the allProducts array
        const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        allProducts = [...allProducts, ...productsList]; // Merge current category products with allProducts
      }
      setAllProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        // CATEGORY SESSION
        categories,
        fetchCategories,

        // creat new category
        isNewCategoryModalVisible,
        toggleNewCategoryModal,
        addCategory,


        // seach category
        deleteCategory,

        // update category name
        updateCategoryName,
        isChangeNameModalVisible,
        toggleChangeCategoryNameModal,
        categoryToEdit,


        ////// PRODUCT SESSION

        allProducts,
        fetchProducts,

        //update product
        isUpdateProductModalVisible,
        updateProduct,
        toggleUpdateProductModal,
        productToEdit,

        // new product  
        isNewProductModalVisible,
        toggleNewProductModal,
        addProduct,

        // delete product
        deleteProduct,

        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => useContext(AppContext);