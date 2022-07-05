import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Container } from "../components/container";
import { CustomButton } from "../components/custom-button";
import { SelectField } from "../components/select-field";
import { useCars, useDeliveresOnCar, useProjects } from "../hooks/use-api";

function CarSelect({ car, setCar, project, setProject }: any) {
  function setProjectAndResetCar(project: any) {
    setProject(project);
    setCar(undefined);
  }

  const projectQuery = useProjects();
  const carsQuery = useCars(project?.id);

  if (projectQuery.isLoading || carsQuery.isLoading) {
    return null;
  }

  const projects = projectQuery.data;
  const cars = carsQuery.data;

  return (
    <>
      <SelectField
        items={projects}
        value={project}
        onChange={setProjectAndResetCar}
      >
        {project?.name || "Projekt auswählen"}
      </SelectField>
      {cars?.length > 0 && (
        <SelectField items={cars} value={car} onChange={setCar}>
          {car?.name || "Fahrzeug auswählen"}
        </SelectField>
      )}
    </>
  );
}

function DeliveryList({ car }: any) {
  const nav = useNavigation();
  const { data, isLoading, isRefetching, refetch } = useDeliveresOnCar(car);

  if (isLoading) {
    return null;
  }

  return (
    <ScrollView
      style={{ flex: 1, width: "90%", marginTop: 16 }}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      {data.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Keine Lieferungen auf dem Fahrzeug
          </Text>
        </View>
      )}
      <>
        {data?.map((delivery: any) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={delivery.id}
            style={{
              marginBottom: 12,
              backgroundColor: "white",
              padding: 16,
              borderRadius: 8,
            }}
            onPress={() =>
              nav.navigate("FinishDelivery", {
                deliveryId: delivery.id,
              })
            }
          >
            <Text style={{ fontWeight: "700", fontSize: 16 }}>
              Lieferung #{delivery.id}
            </Text>
            <Text>
              von {delivery.from_place.name} nach {delivery.to_place.name}
            </Text>
            <Text style={{ color: "gray" }}>
              {delivery.parcels?.length} Paket
              {delivery.parcels?.length > 1 && "e"}
            </Text>
          </TouchableOpacity>
        ))}
      </>
    </ScrollView>
  );
}

export default function HomeScreen() {
  const nav = useNavigation();

  const [car, setCar] = useState<any>();
  const [project, setProject] = useState<any>();

  return (
    <Container>
      <View style={{ width: "90%" }}>
        <CarSelect
          car={car}
          setCar={setCar}
          project={project}
          setProject={setProject}
        />
      </View>
      {car && <DeliveryList car={car.id} />}
      {car && (
        <View style={{ width: "90%", marginBottom: 32 }}>
          <CustomButton
            onPress={() =>
              nav.navigate("CreateDelivery", {
                carId: car.id,
                projectId: project.id,
              })
            }
          >
            Pakete aufladen
          </CustomButton>
        </View>
      )}
    </Container>
  );
}
const styles = StyleSheet.create({
  emptyContainer: {
    paddingVertical: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
