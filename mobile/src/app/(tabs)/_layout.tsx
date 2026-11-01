import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, serif } from "@/lib/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.paper },
        headerTitleStyle: { fontFamily: serif, color: colors.ink },
        tabBarActiveTintColor: colors.bottle,
        tabBarInactiveTintColor: "#6B7A75",
        tabBarStyle: { backgroundColor: colors.paper, borderTopColor: colors.rule },
        sceneStyle: { backgroundColor: colors.paper },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Services",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: "Track",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="locate-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quote"
        options={{
          title: "Quote",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}