import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Barcode, BarcodeDisplay } from "../components/barcode-display";
import { Scanner } from "../components/barcode-scanner";
import { Container } from "../components/container";
import { CustomButton } from "../components/custom-button";
import { RootStackScreenProps } from "../components/navigation";
import { SignatureInput } from "../components/signature-input";
import { useDelivery, useFinishDelivery } from "../hooks/use-api";

interface Receit {
  name: string;
  signature: string;
}

export function FinishDeliveryScreen({
  navigation,
  route,
}: RootStackScreenProps<"FinishDelivery">) {
  const deliveryId = route.params.deliveryId;

  const { data, isLoading, isError } = useDelivery(deliveryId);
  const { mutate } = useFinishDelivery(deliveryId);

  const [receit, setReceit] = useState<Receit | null>(null);
  const [scannedBarcodes, setScannedBarcodes] = useState<Barcode[]>([]);

  const allScanned = data?.parcels?.every((barcode: any) =>
    scannedBarcodes.some(
      (b) => b.barcode_data?.trim() === barcode.barcode_data?.trim()
    )
  );

  if (isLoading || isError) {
    return null;
  }

  return (
    <Container>
      <View style={{ width: "90%" }}>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>
          Lieferung #{data.id}
        </Text>
        <Text>
          von {data.from_place.name} nach {data.to_place.name}
        </Text>
      </View>

      <ScrollView style={{ flex: 1, marginVertical: 18, width: "90%" }}>
        {data.parcels?.map((barcode: Barcode) => (
          <BarcodeDisplay
            barcode={barcode}
            key={barcode.barcode_data}
            scanned={scannedBarcodes.some(
              (b) => b.barcode_data === barcode.barcode_data
            )}
          />
        ))}
      </ScrollView>

      <View style={{ marginBottom: 30, width: "90%" }}>
        {!!receit && (
          <Text
            style={{ fontSize: 16, textAlign: "center", marginVertical: 16 }}
          >
            Signed by: {receit.name}
          </Text>
        )}

        {!allScanned ? (
          <Scanner
            onBarcodeScanned={(barcode) => {
              if (
                scannedBarcodes.find(
                  (scanned) => scanned.barcode_data === barcode.data
                )
              ) {
                Alert.alert(
                  "Already scanned",
                  "This barcode has already been scanned."
                );
                return;
              }
              setScannedBarcodes([
                { barcode_data: barcode.data, barcode_type: barcode.type },
                ...scannedBarcodes,
              ]);
            }}
          />
        ) : (
          <View>
            <SignatureInput onOK={setReceit} />
            <CustomButton
              disabled={!receit}
              onPress={() =>
                Alert.alert("Abladen", "Soll die Lieferung abgeladen werden?", [
                  {
                    text: "Abbrechen",
                    style: "cancel",
                  },
                  {
                    text: "Abschicken",
                    onPress: () => {
                      mutate(receit, {
                        onSuccess: () => navigation.navigate("Root"),
                      });
                    },
                  },
                ])
              }
            >
              Abladen
            </CustomButton>
          </View>
        )}
      </View>
    </Container>
  );
}
