import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { getServices, type Service } from "@/lib/api";
import { colors, serif } from "@/lib/theme";
import Button from "@/components/Button";

export default function ServiceDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const all = await getServices();
        setService(all.find((s) => s.slug === slug) ?? null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load this service.");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator color={colors.bottle} size="large" />
      </View>
    );
  }

  if (error || !service) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 16 }}>
        <Text style={{ fontFamily: serif, fontSize: 22, color: colors.ink }}>
          {error ? "Service could not be loaded" : "This service was not found"}
        </Text>
        {error ? <Text style={{ color: colors.ink }}>{error}</Text> : null}
        <Button label="Back to services" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 48 }}>
      <Stack.Screen options={{ title: service.title }} />
      {service.image ? (
        <Image
          source={{ uri: service.image }}
          style={{ width: "100%", height: 200, marginBottom: 20 }}
          resizeMode="cover"
        />
      ) : null}
      <Text style={{ fontFamily: serif, fontSize: 30, color: colors.ink }}>
        {service.title}
      </Text>
      <Text style={{ marginTop: 12, fontSize: 16, lineHeight: 24, color: colors.ink }}>
        {service.body || service.excerpt}
      </Text>
      <View style={{ marginTop: 28 }}>
        <Button
          label="Request a quote"
          onPress={() =>
            router.push({ pathname: "/quote", params: { service: service.title } })
          }
        />
      </View>
    </ScrollView>
  );
}