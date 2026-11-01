import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors, serif } from "@/lib/theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.paper },
          headerTintColor: colors.bottle,
          headerTitleStyle: { fontFamily: serif, color: colors.ink },
          contentStyle: { backgroundColor: colors.paper },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="service/[slug]" options={{ title: "Service" }} />
      </Stack>
    </>
  );
}