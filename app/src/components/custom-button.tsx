import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function CustomButton({
  children,
  style,
  variant = 'primary',
  ...props
}: TouchableOpacity['props'] & { children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        props.disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
    // width: '100%',
  },
  primary: {
    backgroundColor: '#b02710',
  },
  secondary: {
    backgroundColor: '#2563eb',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
