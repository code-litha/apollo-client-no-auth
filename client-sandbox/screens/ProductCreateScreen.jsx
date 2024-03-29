import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyle, utilities } from "../constant/utilities";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT, GET_PRODUCTS } from "../config/queries";
import ErrorText from "../components/ErrorText";

export default function ProductCreateScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    stock: "",
    price: "",
    imgUrl: "",
  });
  const [doCreateProduct, { data, loading, error }] = useMutation(
    CREATE_PRODUCT,
    {
      onCompleted: (res) => {
        console.log(res, "<<< response create product");
        navigation.navigate("Home");
      },
      refetchQueries: [GET_PRODUCTS],
    }
  );

  const onChangeForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onCreate = async () => {
    // Todo: Handle create product
    // navigation.navigate("Home");
    try {
      await doCreateProduct({
        variables: {
          name: form.name,
          price: Number(form.price),
          stock: Number(form.stock),
          imgUrl: form.imgUrl,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Form</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={globalStyle.textInputSm}
        value={form.name}
        onChangeText={(text) => onChangeForm("name", text)}
      />

      <Text style={styles.label}>Stock</Text>
      <TextInput
        placeholder="Stock"
        style={globalStyle.textInputSm}
        value={form.stock}
        keyboardType={"number-pad"}
        onChangeText={(text) => onChangeForm("stock", text)}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="Price"
        style={globalStyle.textInputSm}
        value={form.price}
        keyboardType={"number-pad"}
        onChangeText={(text) => onChangeForm("price", text)}
      />

      <Text style={styles.label}>Image URL</Text>
      <TextInput
        placeholder="Image URL"
        style={globalStyle.textInputSm}
        value={form.imgUrl}
        onChangeText={(text) => onChangeForm("imgUrl", text)}
      />

      <View style={{ alignItems: "center", marginTop: 20 }}>
        <ErrorText error={error} />
        <TouchableOpacity
          style={[globalStyle.primaryButton, { width: "80%" }]}
          onPress={onCreate}
        >
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={globalStyle.textButton}>Create</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            globalStyle.primaryButton,
            {
              width: "80%",
              backgroundColor: utilities.fontColor.gray400,
            },
          ]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text
            style={[
              globalStyle.textButton,
              { color: utilities.fontColor.gray900 },
            ]}
          >
            Back To Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: utilities.padding.xl,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
    color: utilities.color.primary,
    fontSize: utilities.fontSize.lg,
    marginVertical: 20,
  },
  label: {
    fontSize: 12,
    padding: utilities.padding.xs,
    color: utilities.fontColor.gray600,
  },
});
