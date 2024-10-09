import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, app, collection, addDoc, doc, updateDoc, deleteDoc, getDocs, where, query, getDoc } from '../firebase/config';

// Create context
const AppContext = createContext(undefined);

// Create a provider component
export const AppProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [isNewCategoryModalVisible, setNewCategoryModalVisible] = useState(false);
  const [isChangeNameModalVisible, setChangeNameModalVisible] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);


  // PRODUCT SESSION
  const [productToEdit, setProductToEdit] = useState(null);
  const [isNewProductModalVisible, setNewProductModalVisible] = useState(false);
  const [isUpdateProductModalVisible, setUpdateProductModalVisible] = useState(false);

  // LOADING 
  const [loading, setLoading] = useState(false);

  // INVOICE SESSION
  const [isNewInvoiceModalVisible, setNewInvoiceModalVisible] = useState(false);
  const [isUpdateInvoiceModalVisible, setUpdateInvoiceModalVisible] = useState(false);
  const [invoiceToEdit, setInvoiceToEdit] = useState([]);


  // ADD PRODUCT TO INVOICE
  const [isAddProductToInvoiceModalVisible, setAddProductToInvoiceVisible] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const categoriesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return categoriesList;
    } catch (e) {
      console.error('Error fetching categories: ', e);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (categoryName) => {
    try {
      await addDoc(collection(db, 'categories'), {
        name: categoryName
      });
    } catch (e) {
      console.error('Error adding category: ', e);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const productsRef = collection(db, 'categories', categoryId, 'products');
      const productDocs = await getDocs(productsRef);
      const deletePromises = productDocs.docs.map((productDoc) =>
        deleteDoc(doc(db, 'categories', categoryId, 'products', productDoc.id))
      );
      await Promise.all(deletePromises);
      await deleteDoc(doc(db, 'categories', categoryId));
    } catch (e) {
      console.error('Error deleting category: ', e);
    }
  };

  const updateCategoryName = async (categoryId, newName) => {
    try {
      const categoryRef = doc(db, 'categories', categoryId);
      await updateDoc(categoryRef, { name: newName });
    } catch (e) {
      console.error('Error updating category name: ', e);
    }
  };

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
      setLoading(true);
      const productsCollection = collection(db, 'categories', categoryId, 'products');
      const productQuery = query(productsCollection);
      const querySnapshot = await getDocs(productQuery);
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
      await addDoc(collection(db, 'categories', categoryId, 'products'), newProduct);
    } catch (e) {
      console.log("Error creating product: ", e);
    }
  };


  const deleteProduct = async (categoryId, productId) => {
    try {
      const productRef = doc(db, 'categories', categoryId, 'products', productId);
      await deleteDoc(productRef);
    } catch (e) {
      console.error('Error deleting product: ', e);
    }
  };

  const updateProduct = async (categoryId, productId, newName, newPrice) => {
    const updatedFields = { name: newName, price: newPrice };

    try {
      const productRef = doc(db, 'categories', categoryId, 'products', productId);
      await updateDoc(productRef, updatedFields);
    } catch (e) {
      console.error('Error updating product: ', e);
    }
  };

  // ALL PRODUCT SESSIONS 
  // Function to fetch all products from all categories
  const getAllProducts = async () => {
    try {
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
          parentId: categoryDoc.id,
          ...doc.data(),
        }));

        allProducts = [...allProducts, ...productsList]; // Merge current category products with allProducts
      }
      setAllProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'invoices'));
      const invoicesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return invoicesList;
    } catch (e) {
      console.error('Error fetching invoices: ', e);
    } finally {
      setLoading(false);
    }
  };

  // INVOCIE SESSION
  const addInvoice = async (invoiceDetail) => {
    try {
      await addDoc(collection(db, 'invoices'), {
        name: invoiceDetail.name,
        phone: invoiceDetail.phone
      });
    } catch (e) {
      console.error('Error adding invoice: ', e);
    }
  };

  const toggleNewInvoiceModal = () => {
    setNewInvoiceModalVisible((prev) => !prev);
  };

  const toggleUpdateInvoiceModal = (invoice = null) => {
    setInvoiceToEdit(invoice);
    setUpdateInvoiceModalVisible((prev) => !prev);
  };


  const deleteInvoice = async (invoiceId) => {
    try {
      const productsRef = collection(db, 'invoices', invoiceId, 'products');
      const productDocs = await getDocs(productsRef);
      const deletePromises = productDocs.docs.map((productDoc) =>
        deleteDoc(doc(db, 'invoices', invoiceId, 'products', productDoc.id))
      );
      await Promise.all(deletePromises);
      await deleteDoc(doc(db, 'invoices', invoiceId));
    } catch (e) {
      console.error('Error deleting invoice: ', e);
    }
  };


  // ADD PRODUCT TO INVOICE
  interface Invoice {
    id: string;
    amount: number;
    categoryId: string;
    productId: string;
  }
  const toggleAddProductToInvoice = () => {
    setAddProductToInvoiceVisible((prev) => !prev);
  };

  const fetchProductsFromInvoice = async (invoiceId) => {
    try {
      setLoading(true);

      // Query the products subcollection for the specific category
      const invoiceCollection = collection(db, 'invoices', invoiceId, 'products');
      const invoiceQuery = query(invoiceCollection);
      const invoiceSnapshot = await getDocs(invoiceQuery);

      const invoiceDoc: Invoice[] = invoiceSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Invoice));

      const products = await Promise.all(invoiceDoc.map(async (invoice) => {
        const { amount, categoryId, id, productId } = invoice; // Extract parentId, productId, and amount

        try {
          const productRef = doc(db, 'categories', categoryId, 'products', productId);
          const productSnap = await getDoc(productRef);
          return {
            invoiceId: invoiceId,
            id,
            productId,
            categoryId,
            ...productSnap.data(), // Spread the product data
            amount,                // Add the amount from invoice object
          };

        } catch (error) {
          console.error("Error fetching product: ", error);
          return null;
        }
      }));

      return products.filter(product => product !== null);
    } catch (e) {
      console.error('Error fetching products: ', e);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const deleteFromInvoice = async (invoiceId, productId) => {
    try {
      const productRef = doc(db, 'invoices', invoiceId, 'products', productId);
      await deleteDoc(productRef);
    } catch (e) {
      console.error('Error deleteing from invoice products: ', e);
    }
  };

  const addProductToInvoice = async (invoiceId, products) => {
    try {
      await Promise.all(products.map(async (product) => {
        const doc = { productId: product[0], categoryId: product[1], amount: 1 };
        await addDoc(collection(db, 'invoices', invoiceId, 'products'), doc);
      }));
    } catch (e) {
      console.log("Error adding product to invoice: ", e);
    }
  };

  const increaseProduct = async (invoiceId, productId, newAmount) => {
    try {
      const productRef = doc(db, 'invoices', invoiceId, 'products', productId);
      await updateDoc(productRef, { amount: newAmount });
    } catch (e) {
      console.error('Error increasing product: ', e);
    }
  };

  const decreaseProduct = async (invoiceId, productId, newAmount) => {
    try {
      const productRef = doc(db, 'invoices', invoiceId, 'products', productId);
      await updateDoc(productRef, { amount: newAmount });
    } catch (e) {
      console.error('Error decreasing product: ', e);
    }
  };


  return (
    <AppContext.Provider
      value={{
        // CATEGORY SESSION
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
        getAllProducts,
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
        setLoading,

        // invoie session
        addInvoice,
        deleteInvoice,
        invoiceToEdit,
        isNewInvoiceModalVisible,
        isUpdateInvoiceModalVisible,
        setNewInvoiceModalVisible,
        toggleNewInvoiceModal,
        toggleUpdateInvoiceModal,
        fetchInvoices,

        // add product to invoice
        isAddProductToInvoiceModalVisible,
        toggleAddProductToInvoice,
        addProductToInvoice,
        fetchProductsFromInvoice,
        increaseProduct,
        decreaseProduct,
        deleteFromInvoice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => useContext(AppContext);