import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Container } from '../components/container';
import { RootStackScreenProps } from '../components/navigation';
import { Title } from '../components/title';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <Container>
      <Title>This screen doesn't exist.</Title>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
