import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

type toasterProps = {
  title: string;
  children?: React.ReactNode
  visible: boolean,
  setVisible: (index: boolean) => void
};

const Footer = ({ title, children, visible, setVisible }: toasterProps) => {
  
 
  return (
    <>
      {visible && (
        <View style={styles.backdrop}>
          <Animated.View
          style={[defaultStyles.footer, {height: 400, backgroundColor: "white", borderTopWidth: 0, borderTopLeftRadius: 4, borderTopRightRadius: 4}]}
          entering={SlideInDown.duration(800)}
          exiting={SlideOutDown.duration(500)}
        >
          <View style={styles.header}>
            <Text style={{fontSize: 18, fontFamily: 'inter-sb'}}>{title}</Text>
            <TouchableOpacity style={styles.roundCircle} onPress={()=>setVisible(false)}>
              <Ionicons name='close' size={24} />
            </TouchableOpacity>
          </View>
          {children}
        </Animated.View>
        </View>
      )}
    </>
  );
};

export default Footer;

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end', // Push modal to bottom
  },
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  roundCircle: {paddingVertical: 4, paddingHorizontal: 8, borderRadius: 16, backgroundColor: Colors.background}
});
