import { actionButton } from "@/utils/data";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ActionModal from "../ui/ActionModal";
import AddTag from "./AddTag";
import AssignOrder from "./AssignOrder";

const Actions = ({ id, name: customerName }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const components = {
    AddTag: <AddTag closeModal={undefined} />,
    AssignOrder: <AssignOrder closeModal={undefined} />,
    Awaiting: <Text>Awaiting Component</Text>,
    Shipped: <Text>Shipped Component</Text>,
    Comment: <Text>Comment</Text>,
    Cancel: <Text>Cancel</Text>,
    // etc.
  };

  function handleItemPress(item) {
    if (item.action && typeof item.action === "function") {
      item.action();
      setVisible(false); // Hide modal just in case
      setActiveComponent(null);
    } else if (item.component) {
      setActiveComponent(item.component);
      setVisible(true);
    } else if (item.navigation) {
      setVisible(false); // Hide modal just in case
      setActiveComponent(null);
    }
  }

  // Calculate width for each item based on screen width and desired gaps
  const numColumns = 4;
  const gap = 8; // Gap between items

  return (
    <View style={styles.container}>
      <FlatList
        data={actionButton}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={{ flexWrap: "wrap", maxWidth: "45%" }}>
            {item.component ? (
              // Render custom component
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleItemPress(item)}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
            ) : // Regular action button
            item.navigation ? (
              <Link
                href={`${item.navigation}/?id=${encodeURIComponent(
                  id
                )}&name=${encodeURIComponent(customerName)}`}
                asChild
              >
                <TouchableOpacity style={styles.item}>
                  <Text style={styles.itemText}>{item.title}</Text>
                </TouchableOpacity>
              </Link>
            ) : (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleItemPress(item)}
              >
                <Text style={styles.itemText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item) => String(item.id)}
      />
      {visible && activeComponent && (
        <ActionModal
          id={id}
          title={activeComponent}
          visible={visible}
          setVisible={setVisible}
        >
          {components[activeComponent]}
        </ActionModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 6,
  },
  listContent: {
    gap: 6,
    paddingBottom: 60,
  },
  columnWrapper: {
    gap: 4,
  },

  item: {
    backgroundColor: "rgba(66, 135, 245, 0.1)",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    // Ensure consistent height
  },
  itemText: {
    textAlign: "center",
  },
});

export default Actions;
