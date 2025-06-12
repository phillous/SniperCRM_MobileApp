import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'


const AssignOrder = ({closeModal}) => {
    const [assignedStaff, setAssignedStaff] = useState<string | null>(null)

    const cancelAssign = () => {
      closeModal()
    }
  return (
    <View style={{gap: 4}}>
      <Text style={{fontSize: 14, fontFamily: 'inter'}}>Select Staff</Text>
      <View style={{backgroundColor: assignedStaff ? "white": Colors.background, borderRadius: 8, overflow:'hidden', paddingHorizontal: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center'}}>
        <TextInput placeholder="Select" placeholderTextColor="black" style={{paddingVertical: 8, flex:1}}/>
        <Ionicons name="chevron-down-outline" size={18} />
      </View>
      <TouchableOpacity style={{height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: Colors.blue}} onPress={closeModal}>
        <Text style={{color: 'white', fontFamily: 'inter-sb', fontSize: 16}}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 8}} onPress={() => cancelAssign()}>
        <Text style={{color: 'black', fontFamily: 'inter-sb', fontSize: 16}}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AssignOrder

const styles = StyleSheet.create({})