import { useNavigation } from "@react-navigation/native";
import { renderPrice } from "../utils/renderPrice";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { utilities } from "../constant/utilities";

const { height } = Dimensions.get("screen");

export default function ProductCard({ product, lastIndex }) {
  const navigation = useNavigation();

  const onPressItem = (item) => {
    navigation.navigate("ProductDetail", { id: item._id });
  };

  return (
    <View style={[styles.card, { maxWidth: lastIndex ? "48%" : "100%" }]}>
      <TouchableOpacity
        style={[{ flex: 1, height: "100%" }]}
        onPress={() => onPressItem(product)}
      >
        <View style={[styles.imageContainer]}>
          <Image source={{ uri: product.imgUrl }} style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
          <View style={{ paddingHorizontal: 2, paddingVertical: 5 }}>
            <Text style={styles.contentHeader} numberOfLines={2}>
              {product.name}
            </Text>
            <Text style={styles.price}>
              Rp {renderPrice(product?.price)} ,-
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: "tomato",
    borderWidth: 0.5,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: utilities.color.extraLightGray,
    flex: 1,
    height: height / 3.5,
  },
  imageContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  contentHeader: {
    fontSize: utilities.fontSize.sm,
    fontWeight: "500",
    // textAlign: "center",
    marginBottom: 5,
  },
  price: {
    fontSize: utilities.fontSize.xs,
  },
});
