import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator, FlatList, Image, Pressable, Text, TextInput, View,
} from "react-native";
import { useRouter } from "expo-router";
import { getServices, type Service } from "@/lib/api";
import { colors, serif } from "@/lib/theme";
import Button from "@/components/Button";

export default function ServicesScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Service[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    setError("");
    try {
      setItems(await getServices());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load services.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((s) => `${s.title} ${s.excerpt}`.toLowerCase().includes(q)) : items;
  }, [items, query]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator color={colors.bottle} size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 16 }}>
        <Text style={{ fontFamily: serif, fontSize: 22, color: colors.ink }}>
          Services could not be loaded
        </Text>
        <Text style={{ color: colors.ink }}>{error}</Text>
        <Button label="Try again" onPress={() => load()} />
      </View>
    );
  }

  return (
    <FlatList
      data={filtered}
      keyExtractor={(s) => s.slug}
      refreshing={refreshing}
      onRefresh={() => load(true)}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      ListHeaderComponent={
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontFamily: serif, fontSize: 28, color: colors.ink }}>
            Document services
          </Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search services"
            placeholderTextColor="#6B7A75"
            accessibilityLabel="Search services"
            style={{
              marginTop: 14, borderWidth: 1, borderColor: colors.rule,
              backgroundColor: colors.white, borderRadius: 2,
              paddingHorizontal: 12, paddingVertical: 10, color: colors.ink,
            }}
          />
          <Text style={{ marginTop: 10, color: colors.ink }}>
            {filtered.length} of {items.length} services
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={{ borderWidth: 1, borderColor: colors.rule, padding: 20, gap: 12 }}>
          <Text style={{ fontFamily: serif, fontSize: 20, color: colors.ink }}>
            No service matches that.
          </Text>
          <Button label="Request a quote" onPress={() => router.push("/quote")} />
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/service/${item.slug}`)}
          accessibilityRole="button"
          style={({ pressed }) => ({
            flexDirection: "row", gap: 14, paddingVertical: 16,
            borderTopWidth: 1, borderTopColor: colors.rule,
            backgroundColor: pressed ? "#E6EAE5" : "transparent",
          })}
        >
          {item.image ? (
            <Image source={{ uri: item.image }} style={{ width: 80, height: 80 }} />
          ) : (
            <View style={{ width: 80, height: 80, backgroundColor: colors.rule }} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: serif, fontSize: 20, color: colors.ink }}>
              {item.title}
            </Text>
            <Text numberOfLines={3} style={{ marginTop: 4, color: colors.ink }}>
              {item.excerpt}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}