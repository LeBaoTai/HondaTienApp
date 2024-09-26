import { Text, View } from "react-native";

const InvoiceItem = (props: any) => {
  return (
    <View>
      <Text>
        {props.name}
      </Text>
    </View>
  );
};

export default InvoiceItem;
