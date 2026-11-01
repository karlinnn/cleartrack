import { Pressable, Text } from "react-native";
import { colors } from "@/lib/theme";

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "solid" | "outline";
};

export default function Button({ label, onPress, disabled, variant = "solid" }: Props) {
  const solid = variant === "solid";
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => ({
        backgroundColor: solid ? colors.bottle : "transparent",
        borderWidth: 1,
        borderColor: colors.bottle,
        borderRadius: 2,
        paddingVertical: 14,
        paddingHorizontal: 20,
        alignItems: "center",
        opacity: disabled ? 0.5 : 1,
        transform: [{ translateY: pressed ? 2 : 0 }],
      })}
    >
      <Text style={{ color: solid ? colors.paper : colors.bottle, fontSize: 16, fontWeight: "600" }}>
        {label}
      </Text>
    </Pressable>
  );
}