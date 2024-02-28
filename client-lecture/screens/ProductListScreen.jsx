import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyle, utilities } from "../constant/utilities";
import dataProducts from "../data/products.json";
import { MaterialIcons } from "@expo/vector-icons";
import ProductCard from "../components/ProductCard";

export default function ProductListScreen({ navigation }) {
  const logout = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text>Hello, </Text>
              <Text style={{ fontWeight: "bold" }}>BSD</Text>
            </View>
            <Text>Cari apa hari ini ?</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <TouchableHighlight
              onPress={() => navigation.navigate("ProductCreate")}
              style={[globalStyle.primarySmButton, { marginBottom: 0 }]}
            >
              <Text style={globalStyle.textButton}>Add Product</Text>
            </TouchableHighlight>
            <TouchableOpacity onPress={logout}>
              <MaterialIcons
                name={"logout"}
                size={26}
                color={utilities.fontColor.gray700}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={{
            uri: "https://img.freepik.com/free-vector/hand-painted-social-media-sale-post-template_23-2149039786.jpg",
          }}
          style={{ width: "100%", height: "70%" }}
        />
      </View>
      <View style={{ flex: 3, marginTop: 10 }}>
        <FlatList
          data={dataProducts}
          renderItem={({ item, index }) => {
            const lastIndex =
              dataProducts.length % 2 && index === dataProducts.length - 1;

            return <ProductCard product={item} lastIndex={lastIndex} />;
          }}
          keyExtractor={(item) => item._id}
          numColumns={2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
