import DropdownComponent from '@/components/ui/Dropdown';
import Colors from '@/constants/Colors';
import { agent, Orders } from '@/utils/data';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


type AssignOrderProps = {
  closeModal: () => void;
  id: string
  title: string
};

const Awaiting = ({ closeModal, id, title }:any) => {
    const order = Orders.find(item => item.id === id)
    const [isClose, setIsClose] = useState<string | null>(null)
    const {control, handleSubmit, formState: {errors}} = useForm()

    const cancelAssign = () => {
      closeModal()
    }
  return (
    <View style={{gap: 8 }}>
      <View style={{gap: 4}}>
        <Text style={{fontSize: 14, fontFamily: 'inter'}}>Select From {order?.country} Agents </Text>
      <Controller control={control} name="agent" rules={{
        required: "Please select an agent"
      }} render={({field : {onChange, onBlur, value }}) =>(
        <DropdownComponent
                  data={agent}
                  value={value}
                  onChange={onChange}
                  placeHolderTitle="Select Agent"
                />
      )} />
      </View>
      <View style={{gap: 4}}>
        <Text style={{fontSize: 14, fontFamily: 'inter'}}>Any Commitment fee? Type Amount </Text>
      <Controller control={control} name="commitmentFee" render={({field : {onChange, onBlur, value }}) =>(
        <TextInput onChangeText={onChange} value={value} placeholder='Type Amount' cursorColor={'black'} style={{height: 40, borderRadius: 8, borderWidth: 0.5, paddingHorizontal: 8, borderColor: 'lightgrey'}} />
      )} />
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

export default Awaiting

const styles = StyleSheet.create({})