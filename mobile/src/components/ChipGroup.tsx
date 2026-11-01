import { Pressable, Text, View } from "react-native";
import { colors } from "@/lib/theme";

type Props = {
  options: string[];
  value: string;
  onChange: (v: string) => void;
};

export default function ChipGroup({ options, value, onChange }: Props) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {options.map((o) => {
        const active = o === value;
        return (
          <Pressable
            key={o}
            onPress={() => onChange(o)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={{
              borderWidth: 1,
              borderColor: colors.bottle,
              borderRadius: 2,
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: active ? colors.bottle : "transparent",
            }}
          >
            <Text style={{ color: active ? colors.paper : colors.bottle }}>{o}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}