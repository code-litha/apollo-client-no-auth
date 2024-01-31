import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../components/Logo";
import { globalStyle, utilities } from "../constant/utilities";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../config/queries";
import ErrorText from "../components/ErrorText";

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [doLogin, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: (res) => {
      console.log(res, "<<< response login");
      navigation.navigate("Home");
    },
  });

  const onChangeForm = (value, key) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onLogin = async () => {
    try {
      // Todo: handle login
      // navigation.navigate("Home");
      await doLogin({
        variables: {
          email: form.email,
          password: form.password,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <TextInput
        placeholder="Email"
        value={form.email}
        keyboardType="email-address"
        onChangeText={(text) => onChangeForm(text, "email")}
        style={[globalStyle.textInput, { marginBottom: 25, marginTop: 20 }]}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => onChangeForm(text, "password")}
        style={[globalStyle.textInput, { marginBottom: 35 }]}
      />

      <ErrorText error={error} />
      <TouchableOpacity style={globalStyle.primaryButton} onPress={onLogin}>
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text variant="titleLarge" style={globalStyle.textButton}>
            LOGIN
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: utilities.padding.xl,
  },
});
