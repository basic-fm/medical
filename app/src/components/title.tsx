import { StyleSheet, Text } from 'react-native';

export function Title(props: Text['props']) {
  return <Text {...props} style={styles.title} />;
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
