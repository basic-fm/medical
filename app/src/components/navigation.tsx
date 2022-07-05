import { Feather } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import { ColorSchemeName, Pressable } from "react-native";
import { useCurrentUser } from "../hooks/use-api";
import { CreateDeliveryScreen } from "../screens/delivery-create-screen";
import { FinishDeliveryScreen } from "../screens/delivery-finish-screen";
import HomeScreen from "../screens/home-screen";
import LoginScreen from "../screens/login-screen";
import NotFoundScreen from "../screens/not-found-screen";
import SettingsScreen from "../screens/settings-screen";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: undefined;
  Modal: undefined;
  Settings: undefined;
  NotFound: undefined;
  CreateDelivery: { carId: number; projectId: number };
  FinishDelivery: { deliveryId: number };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: "home",
      Modal: "modal",
      Settings: "settings",
      CreateDelivery: "create-delivery",
      FinishDelivery: "finish-delivery",
      NotFound: "*",
    },
  },
};

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer
      linking={linking}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {!data || isError ? <UnauthNavigator /> : <RootNavigator />}
    </NavigationContainer>
  );
}

const UnauthStack = createNativeStackNavigator();

function UnauthNavigator() {
  return (
    <UnauthStack.Navigator>
      <Stack.Screen
        name="Root"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </UnauthStack.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={HomeScreen}
        options={{ title: "Startseite", headerRight: HeaderRight }}
      />
      <Stack.Screen
        name="CreateDelivery"
        component={CreateDeliveryScreen}
        options={{ title: "Aufladen" }}
      />
      <Stack.Screen
        name="FinishDelivery"
        component={FinishDeliveryScreen}
        options={{ title: "Abladen" }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Not Found!" }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Einstellungen" }}
      />
    </Stack.Navigator>
  );
}

function HeaderRight() {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("Settings")}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Feather name="settings" size={25} style={{ marginRight: 15 }} />
    </Pressable>
  );
}
