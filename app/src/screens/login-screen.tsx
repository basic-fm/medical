import { useController, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput as DefaultTextInput,
  View,
} from "react-native";
import { Container } from "../components/container";
import { CustomButton } from "../components/custom-button";
import { useLogin } from "../hooks/use-api";

export function TextInput({
  name,
  control,
  ...props
}: DefaultTextInput["props"] & { control: any; name: string }) {
  const { field } = useController({
    control: control,
    name: name,
    defaultValue: props.defaultValue || "",
  });

  return (
    <DefaultTextInput
      {...props}
      value={field.value}
      onChangeText={field.onChange}
    />
  );
}

export default function LoginScreen() {
  const { control, handleSubmit } = useForm();
  const { mutate } = useLogin();

  const login = handleSubmit((data) => {
    mutate({ username: data.username?.toLowerCase(), password: data.password });
  });

  return (
    <Container centered>
      <View style={{ padding: 8, width: "100%", maxWidth: 400 }}>
        <View style={styles.form}>
          <View style={styles.formField}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Benutzername"
              name="username"
              control={control}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              secureTextEntry
              placeholder="Passwort"
              name="password"
              control={control}
            />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton onPress={login}>Anmelden</CustomButton>
          </View>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 16,
  },
  formField: {
    marginBottom: 8,
  },
  label: {
    marginVertical: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
