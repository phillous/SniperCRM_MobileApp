import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ModalChildProps = {
  closeModal?: () => void;
  id?: string;
};

type actionProps = {
    id?: string, 
    children: React.ReactElement<ModalChildProps> | React.ReactNode;
    title: string,
    visible: boolean,
    setVisible: (index: boolean) => void
   
}

const ActionModal = ({id, children, title, visible, setVisible}: actionProps ) => {
  
  return (
    <Modal visible={visible}
      transparent={true}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
      backdropColor={'rgba(0, 0, 0, 0.5)'}
      >
      <View style={styles.modalOverlay} >
        <View style={styles.modalContent} >
          <View style={styles.modalHeader}>
            <Text style={{fontSize: 18, fontFamily: 'inter-sb', maxWidth: '80%', flexWrap: 'wrap'}}>{title}</Text>
            <TouchableOpacity style={styles.roundCircle} onPress={()=>setVisible(false)}>
              <Ionicons name='close' size={24} />
            </TouchableOpacity>
          </View>
        {React.isValidElement(children) && typeof children.type !== 'string'
          ? React.cloneElement(children as React.ReactElement<any>, {
              ...(children.props || {}),
              closeModal: () => setVisible(false),
              id: id
            })
          : children}
            </View>
      </View>
    </Modal >
  )
}

export default ActionModal

const styles = StyleSheet.create({
    modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
    maxHeight: '80%',
    elevation: 4,
  },
  roundCircle: {paddingVertical: 4, paddingHorizontal: 8, borderRadius: 16, backgroundColor: Colors.background}
})