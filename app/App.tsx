import { StatusBar } from "expo-status-bar";
import { Alert, LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Sentry from "sentry-expo";
import Navigation from "./src/components/navigation";
import useCachedResources from "./src/hooks/use-cached-resources";

LogBox.ignoreLogs(["Setting a timer"]);

Sentry.init({
  dsn: "https://64bf668d3ec64e0da7570b144082d553@o1304495.ingest.sentry.io/6545085",
  enableInExpoDevelopment: false,
});

const qc = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (err) => {
        Sentry.Native.captureException(err);

        Alert.alert("Es ist ein Fehler aufgetreten!", (err as any)?.message);
      },
    },
  },
});

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={qc}>
        <SafeAreaProvider>
          <Navigation colorScheme={"light"} />
          <StatusBar />
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }
}

export default App;
