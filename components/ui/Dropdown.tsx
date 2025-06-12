import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


const DropdownComponent = ({data, onChange, value, placeHolderTitle}) => {
    const [isFocus, setIsFocus] = useState(false)
  return (
    <View style={{marginTop: 4}}>
      <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="id"
          placeholder={!isFocus ? placeHolderTitle : '...'}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={value}
        onChange={item => onChange(item)}
          
        />
    </View>
  )
}

export default DropdownComponent

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 12,
    },
    icon: {
      marginRight: 5,
    },
    // label: {
    //   position: 'absolute',
    //   backgroundColor: 'white',
    //   left: 22,
    //   top: 8,
    //   zIndex: 999,
    //   paddingHorizontal: 8,
    //   fontSize: 14,
    // },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
})