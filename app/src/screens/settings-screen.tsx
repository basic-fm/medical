import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, View } from "react-native";
import { Container } from "../components/container";
import { CustomButton } from "../components/custom-button";
import { Title } from "../components/title";
import { useCurrentUser, useLogout } from "../hooks/use-api";

export default function SettingsScreen() {
  const { data: user } = useCurrentUser();
  const { mutateAsync } = useLogout();

  function logout() {
    mutateAsync();
  }

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <Title>{user.email}</Title>
      </View>
      <View style={{ width: "90%", marginBottom: 32 }}>
        <CustomButton onPress={logout}>Abmelden</CustomButton>
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Container>
  );
}
