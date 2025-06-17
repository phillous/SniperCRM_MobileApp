import Colors from "@/constants/Colors";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Comment = ({ closeModal, id }:any) => {
  const [isComment, setIsComment] = useState("");
  return (
    <View style={style.content}>
      <Text style={{ fontFamily: "inter-r", fontSize: 14 }}>
        Type Comment Below
      </Text>
      <TextInput
        value={isComment}
        onChangeText={(value) => setIsComment(value)}
        multiline
        textAlignVertical="top"
        cursorColor={Colors.blue}
        style={{
          height: 80,
          borderColor: "lightGrey",
          borderWidth: 0.5,
          borderRadius: 8,
          paddingHorizontal: 8,
          
        }}
      />

      <View style={{marginTop: 8}}>
        <TouchableOpacity
          style={{
            height: 40,
            borderRadius: 8,
            backgroundColor: Colors.blue,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontFamily: "inter-r" }}>
            Save
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 40,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={closeModal}
        >
          <Text style={{ color: "black", fontSize: 18, fontFamily: "inter-r" }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comment;

const style = StyleSheet.create({
  content: {
    
    marginTop: 6,
    gap: 8
  },
});
