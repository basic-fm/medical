import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { Button, Modal, Text, View } from "react-native";
import { CustomButton } from "./custom-button";

export function Scanner({
  onBarcodeScanned,
}: {
  onBarcodeScanned: (barcode: BarCodeEvent) => void;
}) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    setModalVisible(false);

    onBarcodeScanned({
      type: typeof type === "string" ? type.trim() : type,
      data: typeof data === "string" ? data.trim() : data,
    });
  };

  if (hasPermission === null) {
    return null;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!modalVisible) {
    return (
      <CustomButton variant="secondary" onPress={() => setModalVisible(true)}>
        Scanner öffnen
      </CustomButton>
    );
  }

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      presentationStyle="pageSheet"
      collapsable
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 50,
            backgroundColor: "#fff",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 16,
          }}
        >
          <View></View>
          <Button title={"Cancel"} onPress={() => setModalVisible(false)} />
        </View>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{ flex: 1 }}
        />
      </View>
    </Modal>
  );
}
