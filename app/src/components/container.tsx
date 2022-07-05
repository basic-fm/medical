import { StyleSheet, View } from 'react-native';

export function Container(props: View['props'] & { centered?: boolean }) {
  return <View {...props} style={[styles.container, props.centered && styles.centered]} />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  centered: {
    justifyContent: 'center',
  },
});
