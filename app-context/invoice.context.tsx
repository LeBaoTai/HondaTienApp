import { createContext, useContext, useEffect, useState } from "react";
import { useAppContext } from "./app.context";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";


interface IProduct {
  id: string;
  name: string;
  price: number;
}

interface IInvoiceItem {
  id: string;
  name: string;
  phone: string;
  products: IProduct[];
  isPrint: boolean;
}

interface InvoiceContextType {
  invoices: IInvoiceItem[];
  setInvoices: React.Dispatch<React.SetStateAction<IInvoiceItem[]>>;

  toggleUpdateInvoiceModal: (invoice?: IInvoiceItem) => void;
  isUpdateInvoiceModalVisible: boolean;

  toggleNewInvoiceModal: () => void;
  isNewInvoiceModalVisible: boolean;

  fetchInvoices: () => Promise<void>;
  addInvoice: (invoiceDetail: IInvoiceItem) => Promise<void>;
  deleteInvoice: (invoiceId) => Promise<void>;

  addProductToInvoice: (invoiceId, productId) => Promise<void>;

  invoiceToEdit: IInvoiceItem;
  setInvoiceToEdit: React.Dispatch<React.SetStateAction<IInvoiceItem>>;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider = ({ children }) => {
  const { setLoading } = useAppContext();

  const [invoices, setInvoices] = useState<IInvoiceItem[]>([]);
  const [isNewInvoiceModalVisible, setNewInvoiceModalVisible] = useState(false);
  const [isAddProductVisible, setAddProductVisible] = useState(false);
  const [isUpdateInvoiceModalVisible, setUpdateInvoiceModalVisible] = useState(false);
  const [invoiceToEdit, setInvoiceToEdit] = useState<IInvoiceItem>(null);

  const fetchInvoices = async () => {
    try {
      // start loading
      setLoading(true);

      const querySnapshot = await getDocs(collection(db, 'invoices'));

      const invoicesList = querySnapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          name: data.name || '',
          phone: data.phone || '',
          products: data.products || [],
          isPrint: data.isPrint || false,
        } as IInvoiceItem;
      });

      // Set the fetched categories in the local state
      setInvoices(invoicesList);
    } catch (e) {
      console.error('Error fetching invoices: ', e);
    } finally {
      setLoading(false);
    }
  };

  const addInvoice = async (invoiceDetail) => {
    try {
      // loading
      setLoading(true);

      // Add to Firestore
      await addDoc(collection(db, 'invoices'), {
        name: invoiceDetail.name,
        phone: invoiceDetail.phone,

      });

      fetchInvoices();
    } catch (e) {
      console.error('Error adding invoice: ', e);
    } finally {
      setLoading(false);
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
      // set loading
      setLoading(true);

      // Reference to the products subcollection
      const productsRef = collection(db, 'invoices', invoiceId, 'products');

      // Fetch all products in the category
      const productDocs = await getDocs(productsRef);

      // Delete each product document in the subcollection
      const deletePromises = productDocs.docs.map((productDoc) =>
        deleteDoc(doc(db, 'invoices', invoiceId, 'products', productDoc.id))
      );

      // Wait for all products to be deleted
      await Promise.all(deletePromises);

      // Delete the category document itself
      await deleteDoc(doc(db, 'invoices', invoiceId));

      // Update local state
      fetchInvoices();
    } catch (e) {
      console.error('Error deleting invoice: ', e);
    } finally {
      setLoading(false);
    }
  };

  const addProductToInvoice = async (invoiceId, productId) => {
    try {
      setLoading(true);
      try {
        setLoading(true);
        await addDoc(collection(db, 'categories', invoiceId, 'products'), productId);
      } catch (e) {
        console.log("Error creating product: ", e);
      } finally {
        setLoading(false);
      }
    } catch (e) {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <InvoiceContext.Provider
      value={{
        fetchInvoices,

        invoices,
        setInvoices,

        invoiceToEdit,
        setInvoiceToEdit,

        addInvoice,
        deleteInvoice,

        addProductToInvoice,

        isNewInvoiceModalVisible,
        isUpdateInvoiceModalVisible,
        toggleNewInvoiceModal,
        toggleUpdateInvoiceModal,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => useContext(InvoiceContext);