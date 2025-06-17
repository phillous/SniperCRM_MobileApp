import AddTag from "@/components/Orders/AddTag";
import AssignOrder from "@/components/Orders/AssignOrder";
import Awaiting from "@/components/Orders/Awaiting";
import Comment from "@/components/Orders/Comment";
import ActionModal from "@/components/ui/ActionModal";
import { actionButton } from "@/utils/data";
import { Link, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ComponentKey = "AddTag" | "AssignOrder" | "Awaiting" | "Shipped" | "Comment" | "Cancel";

type ComponentConfig = {
  component: React.ReactNode;
  title: string;
};



const Actions = ({ id, name: customerName }: { id: string; name: string }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [activeComponent, setActiveComponent] = useState<ComponentKey | null>(null);



// Inside your component
const components: Record<ComponentKey, ComponentConfig> = useMemo(() => ({
  AddTag: { component: <AddTag />, title: "Tags" },
  AssignOrder: { component: <AssignOrder />, title: "Assign Order" },
  Awaiting: { component: <Awaiting />, title: `Assign ${customerName} to...` },
  Shipped: { component: <Text>Shipped Component</Text>, title: "Shipped" },
  Comment: { component: <Comment />, title: `Comment on ${customerName} order...` },
  Cancel: { component: <Text>Cancel</Text>, title: `Cancel ${customerName} order...` },
}), [customerName]);


  function handleItemPress(item: any) {
    if (item.action && typeof item.action === "function") {
      item.action();
      setVisible(false); // Hide modal just in case
      setActiveComponent(null);
    } else if (item.component) {
      setActiveComponent(item.key);
      setVisible(true); 
    } else if (item.navigation) {
      setVisible(false); // Hide modal just in case
      setActiveComponent(null);
    }
  }



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
                href={
                  `${item.navigation}/?id=${encodeURIComponent(
                    id
                  )}&name=${encodeURIComponent(customerName)}` as any
                }
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
          title={components[activeComponent].title}
          visible={visible}
          setVisible={setVisible}
        >
          {components[activeComponent].component}
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
