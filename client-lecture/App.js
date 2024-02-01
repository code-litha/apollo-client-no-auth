import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./navigation/MainStack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </ApolloProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
