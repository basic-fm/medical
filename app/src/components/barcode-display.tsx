import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface Barcode {
  barcode_type: string;
  barcode_data: string;
}

export function BarcodeDisplay({
  onDelete,
  barcode,
  scanned = false,
}: {
  barcode: Barcode;
  onDelete?: (data: string) => void;
  scanned?: boolean;
}) {
  return (
    <View style={[styles.barcode, scanned && styles.scannedBg]}>
      {scanned ? <Feather size={16} name="check" style={styles.itemIcon} /> : null}
      <Text style={[styles.barcodeData, scanned && styles.scannedText]}>{barcode.barcode_data}</Text>
      {onDelete && (
        <TouchableOpacity style={styles.barcodeButton} onPress={() => onDelete(barcode.barcode_data)}>
          <Feather name="trash" size={14} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  barcode: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderColor: '#eee',
    borderWidth: 1,
  },
  scannedBg: {
    backgroundColor: '#dcfce7',
  },
  scannedText: {
    color: '#14532d',
  },
  barcodeData: {
    flex: 1,
    fontWeight: 'bold',
  },
  barcodeButton: { justifyContent: 'center', alignItems: 'center' },
  itemIcon: {
    marginRight: 8,
    color: '#14532d',
  },
});
