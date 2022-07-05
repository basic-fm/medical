import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Barcode, BarcodeDisplay } from "../components/barcode-display";
import { Scanner } from "../components/barcode-scanner";
import { Container } from "../components/container";
import { CustomButton } from "../components/custom-button";
import { RootStackScreenProps } from "../components/navigation";
import { SelectField } from "../components/select-field";
import { useCreateDelivery, usePlaces } from "../hooks/use-api";

export function CreateDeliveryScreen({
  route,
}: RootStackScreenProps<"CreateDelivery">) {
  const car = route.params.carId;
  const project = route.params.projectId;

  const [from, setFrom] = useState<any>();
  const [to, setTo] = useState<any>();

  const { mutate } = useCreateDelivery();

  const { data: places, isLoading } = usePlaces(project);

  const [scannedBarcodes, setScannedBarcodes] = useState<Barcode[]>([]);

  if (!places?.length || isLoading) {
    return null;
  }

  return (
    <Container>
      <View style={{ marginBottom: 18, width: "90%" }}>
        <SelectField items={places} value={from} onChange={setFrom}>
          {from?.name || "Von"}
        </SelectField>
        <SelectField items={places} value={to} onChange={setTo}>
          {to?.name || "Für"}
        </SelectField>
      </View>
      <ScrollView style={{ flex: 1, marginVertical: 18, width: "90%" }}>
        {scannedBarcodes.map((barcode) => (
          <BarcodeDisplay
            barcode={barcode}
            onDelete={(data) => {
              setScannedBarcodes((codes) =>
                codes.filter((c) => c.barcode_data !== data)
              );
            }}
            key={barcode.barcode_data}
          />
        ))}
      </ScrollView>

      <View style={{ marginBottom: 30, width: "90%" }}>
        <Scanner
          onBarcodeScanned={(barcode) => {
            if (
              scannedBarcodes.find(
                (scanned) => scanned.barcode_data === barcode.data
              )
            ) {
              Alert.alert(
                "Barcode bereits gescannt",
                "Dieser Barcode wurde bereits gescannt. Bitte scanne einen anderen Barcode."
              );
              return;
            }
            setScannedBarcodes([
              { barcode_data: barcode.data, barcode_type: barcode.type },
              ...scannedBarcodes,
            ]);
          }}
        />

        {scannedBarcodes.length > 0 && (
          <CustomButton
            style={{ marginTop: 24 }}
            onPress={() =>
              Alert.alert(
                "Aufladen",
                "Wurden alle Pakete eingescannt und die Orte korrekt angegeben?",
                [
                  {
                    text: "Abbrechen",
                    style: "cancel",
                  },
                  {
                    text: "Erstellen",
                    onPress: () => {
                      mutate(
                        {
                          parcels: scannedBarcodes,
                          to_place: to?.id,
                          from_place: from?.id,
                          car,
                        },
                        {
                          onSuccess: () => {
                            setScannedBarcodes([]);
                          },
                        }
                      );
                    },
                  },
                ]
              )
            }
          >
            Aufladen
          </CustomButton>
        )}
      </View>
    </Container>
  );
}
