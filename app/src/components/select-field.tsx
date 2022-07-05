import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function SelectField({ children, items, onChange, value, key = 'id' }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.trigger} activeOpacity={0.7}>
        <Text>{children}</Text>
        <Feather size={16} name="chevron-down" />
      </TouchableOpacity>

      {modalVisible && (
        <Modal animationType="slide">
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>

            <ScrollView>
              <TouchableOpacity
                onPress={() => {
                  onChange(undefined);
                  setModalVisible(false);
                }}
                style={styles.item}
              >
                {!value ? <Feather size={16} name="check" style={styles.itemIcon} /> : null}
                <Text style={styles.itemText}>---</Text>
              </TouchableOpacity>
              {items.map((item: any) => (
                <TouchableOpacity
                  key={item[key]}
                  onPress={() => {
                    onChange(item);
                    setModalVisible(false);
                  }}
                  style={styles.item}
                >
                  {value === item[key] ? <Feather size={16} name="check" style={styles.itemIcon} /> : null}
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'flex-end', paddingEnd: 8, marginBottom: 8 },
  trigger: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    marginBottom: 2,
  },
  itemText: {
    fontSize: 16,
  },
  itemIcon: {
    marginRight: 8,
    color: '#14532d',
  },
});
