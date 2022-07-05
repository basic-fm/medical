import * as SecureStore from "expo-secure-store";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { http } from "../fetch";

export function useCurrentUser() {
  return useQuery<any>("getCurrentUser", () =>
    http<any>("users/current_user/").catch(() => null)
  );
}

interface LoginResult {
  token: string;
}

export function useLogin() {
  const qc = useQueryClient();

  return useMutation(
    async (data: any) => {
      await SecureStore.deleteItemAsync("token");

      return http<LoginResult>("token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((data) => {
        SecureStore.setItemAsync("token", data.token);

        return data;
      });
    },
    {
      onSuccess: () => qc.invalidateQueries("getCurrentUser"),
    }
  );
}

export function useLogout() {
  const qc = useQueryClient();

  return useMutation(() => SecureStore.deleteItemAsync("token"), {
    onSuccess: () => qc.invalidateQueries("getCurrentUser"),
  });
}

export function useProjects() {
  return useQuery("projects", () => http<any>("projects/my_projects/"));
}

export function useCars(projectId?: number) {
  return useQuery(
    ["cars", projectId],
    () => http<any>(`projects/${projectId}/cars/`),
    {
      enabled: !!projectId,
    }
  );
}

export function usePlaces(projectId?: number) {
  return useQuery("places", () => http<any>(`projects/${projectId}/places/`), {
    enabled: projectId !== undefined && projectId !== null,
  });
}

export function useFinishDelivery(id: any) {
  const qc = useQueryClient();

  return useMutation(
    async (data: any) => {
      return http<any>(`deliveries/${id}/finish_delivery/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          image: data.signature,
        }),
      });
    },
    {
      onSuccess: () => qc.invalidateQueries("parcels"),
    }
  );
}

export function useCreateDelivery() {
  const qc = useQueryClient();

  return useMutation(
    (data: any) =>
      http<any>("deliveries/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    {
      onSuccess: () => qc.invalidateQueries("parcels"),
    }
  );
}

export function useDelivery(id: any) {
  return useQuery(["parcels", id], () => http<any>(`deliveries/${id}/`), {
    enabled: !!id,
  });
}

export function useDeliveresOnCar(carId: number) {
  return useQuery(
    ["parcels"],
    () =>
      http<any>(
        `deliveries/?car=${carId}&from_place=&to_place=&not_delivered=true`
      ),
    {
      enabled: !!carId,
    }
  );
}
