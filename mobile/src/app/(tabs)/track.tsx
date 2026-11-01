import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getApplication, STAGE_LABELS, type Application } from "@/lib/api";
import { colors, serif } from "@/lib/theme";
import Button from "@/components/Button";

const DEMO = ["CT-2026-0042", "CT-2026-0043", "CT-2026-0044", "CT-2026-0045"];

export default function TrackScreen() {
  const params = useLocalSearchParams<{ reference?: string }>();
  const [input, setInput] = useState("");
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lookup = useCallback(async (value: string) => {
    if (!value.trim()) {
      setError("Enter your reference number.");
      return;
    }
    setLoading(true);
    setError("");
    setApp(null);
    try {
      setApp(await getApplication(value));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (params.reference) {
      setInput(params.reference);
      lookup(params.reference);
    }
  }, [params.reference, lookup]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: 20, paddingBottom: 48 }}
    >
      <Text style={{ fontFamily: serif, fontSize: 28, color: colors.ink }}>
        Track your application
      </Text>

      <Text style={{ marginTop: 16, marginBottom: 6, fontWeight: "600", color: colors.ink }}>
        Reference number
      </Text>
      <TextInput
        value={input}
        onChangeText={setInput}
        autoCapitalize="characters"
        autoCorrect={false}
        placeholder="CT-2026-0000"
        placeholderTextColor="#6B7A75"
        accessibilityLabel="Reference number"
        style={{
          borderWidth: 1, borderColor: colors.rule, backgroundColor: colors.white,
          borderRadius: 2, paddingHorizontal: 12, paddingVertical: 10, color: colors.ink,
        }}
      />
      <View style={{ marginTop: 12 }}>
        <Button label={loading ? "Checking" : "Track"} onPress={() => lookup(input)} disabled={loading} />
      </View>

      <Text style={{ marginTop: 16, color: colors.ink }}>Demo references:</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
        {DEMO.map((d) => (
          <Text
            key={d}
            onPress={() => {
              setInput(d);
              lookup(d);
            }}
            style={{
              color: colors.bottle, textDecorationLine: "underline", paddingVertical: 4,
            }}
          >
            {d}
          </Text>
        ))}
      </View>

      {loading ? <ActivityIndicator style={{ marginTop: 24 }} color={colors.bottle} /> : null}

      {error ? (
        <Text accessibilityRole="alert" style={{ marginTop: 20, color: colors.error }}>
          {error}
        </Text>
      ) : null}

      {app ? (
        <View style={{ marginTop: 28 }}>
          <Text style={{ fontFamily: serif, fontSize: 24, color: colors.ink }}>
            {app.reference}
          </Text>
          <Text style={{ marginTop: 4, color: colors.ink }}>
            {app.firstName} - {app.service}
          </Text>
          <Text style={{ marginTop: 2, color: colors.ink }}>
            Estimated completion: {app.estimatedDate}
          </Text>

          {app.extraDocsRequired ? (
            <View style={{ marginTop: 14, borderWidth: 1, borderColor: colors.brass, padding: 12 }}>
              <Text style={{ color: colors.ink, fontWeight: "600" }}>
                Additional documents required
              </Text>
            </View>
          ) : null}

          <View style={{ marginTop: 24 }}>
            {STAGE_LABELS.map((label, i) => {
              const done = i < app.stage;
              const current = i === app.stage;
              return (
                <View key={label} style={{ flexDirection: "row", minHeight: 44 }}>
                  <View style={{ alignItems: "center", width: 28 }}>
                    <View
                      style={{
                        width: 16, height: 16, borderRadius: 8, borderWidth: 2,
                        borderColor: done || current ? colors.bottle : colors.rule,
                        backgroundColor: done ? colors.bottle : current ? colors.brass : "transparent",
                      }}
                    />
                    {i < STAGE_LABELS.length - 1 ? (
                      <View
                        style={{
                          flex: 1, width: 2,
                          backgroundColor: i < app.stage ? colors.bottle : colors.rule,
                        }}
                      />
                    ) : null}
                  </View>
                  <Text
                    style={{
                      marginLeft: 10, color: colors.ink, fontSize: 16,
                      fontWeight: current ? "700" : "400",
                      opacity: done || current ? 1 : 0.55,
                    }}
                  >
                    {label}
                  </Text>
                </View>
              );
            })}
          </View>

          <Text style={{ marginTop: 20, fontFamily: serif, fontSize: 20, color: colors.ink }}>
            History
          </Text>
          {app.history.map((h, i) => (
            <View key={i} style={{ marginTop: 10 }}>
              <Text style={{ color: colors.ink, fontWeight: "600" }}>
                {STAGE_LABELS[h.stage]}
              </Text>
              <Text style={{ color: "#6B7A75" }}>
                {new Date(h.timestamp).toLocaleString()}
              </Text>
              {h.note ? <Text style={{ color: colors.ink }}>{h.note}</Text> : null}
            </View>
          ))}

          <Text style={{ marginTop: 20, color: colors.ink, fontStyle: "italic" }}>
            Officer remark: {app.officerRemark}
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}