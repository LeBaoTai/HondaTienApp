import { Button, FlatList, StyleSheet, View } from "react-native";
import { useAppContext } from "../../app-context/app.context";
import InvoiceItem from "../item/invoice.item";
import CreateInvoiceModal from "./modal/invoice/create-invoice.modal";
import { InvoiceProvider } from "../../app-context/invoice.context";
import { useEffect, useState } from "react";

const InvoiceScreen = () => {
  const { toggleNewInvoiceModal, getAllProducts, fetchInvoices } = useAppContext();
  const [invoices, setInvoices] = useState([]);

  const fetchInvoicesToRender = async () => {
    const fetchedInvoices = await fetchInvoices();
    setInvoices(fetchedInvoices);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    fetchInvoicesToRender();
  }, []);


  return (
    <InvoiceProvider>
      <View style={styles.container}>
        <FlatList
          data={invoices}
          keyExtractor={(item) => item.id}
          renderItem={
            ({ item }) => {
              return (
                <InvoiceItem
                  {...item}
                />
              );
            }
          }
        />
        <View style={styles.btn}>
          <Button
            onPress={() => toggleNewInvoiceModal(true)}
            title='Tạo hoá đơn mới'
          />
        </View>
        <CreateInvoiceModal reload={fetchInvoicesToRender} />
      </View>
    </InvoiceProvider>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  btn: {
    borderTopWidth: 1,
    borderColor: '#80C4E9',
    padding: 20,
  }
});