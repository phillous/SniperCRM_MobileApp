import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { format } from 'date-fns';

type BottomModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onChange: (selectedDate: string[]) => void;
};

const BottomModal = ({ visible, setVisible, onChange }: BottomModalProps) => {
  const today = new Date().toISOString().substring(0, 10);
  const [selectedDate, setSelectedDates] = useState<string[]>([]);

  const handleDateChange = (date: string) => {
    // If we already have 2 dates, reset and start new selection
    if (selectedDate.length === 2) {
      setSelectedDates([date]);
      return;
    }

    // If this is the first date or the new date is after the first date
    if (selectedDate.length === 0 || date > selectedDate[0]) {
      setSelectedDates((prev) => [...prev, date]);
    }
    // If the new date is before the first date, make it the new start date
    else {
      setSelectedDates([date]);
    }
  };
  const resetSelection = () => {
    setSelectedDates([]);
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
      backdropColor={'rgba(0, 0, 0, 0.5)'}
    >
      <View style={[styles.modalOverlay]}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 18, fontFamily: 'inter-sb' }}>Select Date Range</Text>
              <Text>
                {selectedDate.length === 2
                  ? `${format(selectedDate[0], 'MMM do')} - ${format(selectedDate[1], 'MMM do')}`
                  : selectedDate[0]
                    ? `${format(selectedDate[0], 'MMM do')} - Select End Date`
                    : 'Select Start Date'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setVisible(false)} style={defaultStyles.roundCircle}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={[defaultStyles.card, { paddingVertical: 4 }]}>
            <Calendar
              current={today}
              maxDate={today}
              onDayPress={(day) => handleDateChange(day.dateString)}
              markedDates={{
                ...(selectedDate[0] && {
                  [selectedDate[0]]: { selected: true, color: Colors.blue, textColor: 'white' },
                }),
                ...(selectedDate[1] && {
                  [selectedDate[1]]: { selected: true, color: Colors.blue, textColor: 'white' },
                }),
              }}
              markingType={'period'}
            />
          </View>
          <View
            style={[
              defaultStyles.footer,
              { flexDirection: 'row', gap: 4, borderTopWidth: 0, alignContent: 'center' },
            ]}
          >
            <TouchableOpacity
              style={{
                width: '50%',
                alignItems: 'center',
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: Colors.blue,
                justifyContent: 'center',
              }}
              onPress={() => resetSelection()}
            >
              <Text style={{ fontFamily: 'inter', color: Colors.blue, fontSize: 14 }}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '50%',
                alignItems: 'center',
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: Colors.blue,
                justifyContent: 'center',
                backgroundColor: Colors.blue,
              }}
              disabled={selectedDate.length === 2 ? false : true}
              onPress={() => {
                onChange(selectedDate);
                setVisible(false);
              }}
            >
              <Text style={{ fontFamily: 'inter', color: 'white', fontSize: 14 }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  selectionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  resetButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  resetButtonText: {
    color: '#666',
    fontSize: 14,
  },
});
