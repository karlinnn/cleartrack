import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getServices, submitQuote } from "@/lib/api";
import { colors, serif } from "@/lib/theme";
import Button from "@/components/Button";
import ChipGroup from "@/components/ChipGroup";

const CATEGORIES = ["Personal", "Educational", "Commercial", "Legal"];
const COUNTRIES = ["UAE", "India", "UK", "USA", "Saudi Arabia", "Canada", "Philippines", "Pakistan"];
const PURPOSES = ["Employment", "Study", "Visa", "Business", "Family", "Personal Reasons"];

function Label({ children }: { children: string }) {
  return (
    <Text style={{ marginTop: 20, marginBottom: 8, fontWeight: "600", color: colors.ink }}>
      {children}
    </Text>
  );
}

function Input(props: React.ComponentProps<typeof TextInput> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <>
      <Label>{label}</Label>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor="#6B7A75"
        {...rest}
        style={{
          borderWidth: 1, borderColor: colors.rule, backgroundColor: colors.white,
          borderRadius: 2, paddingHorizontal: 12, paddingVertical: 10, color: colors.ink,
        }}
      />
    </>
  );
}

export default function QuoteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ service?: string }>();
  const [services, setServices] = useState<string[]>([]);
  const [service, setService] = useState("");
  const [category, setCategory] = useState("Personal");
  const [country, setCountry] = useState("UAE");
  const [purpose, setPurpose] = useState("Employment");
  const [urgency, setUrgency] = useState("standard");
  const [count, setCount] = useState("1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState("");

  useEffect(() => {
    getServices()
      .then((list) => {
        const titles = list.map((s) => s.title);
        setServices(titles);
        setService((cur) => cur || params.service || titles[0] || "");
      })
      .catch(() => setErrors({ _: "Could not load services. Check your connection." }));
  }, [params.service]);

  useEffect(() => {
    if (params.service) setService(params.service);
  }, [params.service]);

  async function send() {
    setSending(true);
    setErrors({});
    try {
      const res = await submitQuote({
        service, category, country, purpose, urgency,
        count: parseInt(count, 10) || 0,
        name, email, phone,
      });
      if (res.errors) setErrors(res.errors);
      else if (res.reference) setReference(res.reference);
    } catch (e) {
      setErrors({ _: e instanceof Error ? e.message : "Network error. Try again." });
    } finally {
      setSending(false);
    }
  }

  if (reference) {
    return (
      <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 16 }}>
        <Text style={{ fontFamily: serif, fontSize: 28, color: colors.ink }}>
          Request received
        </Text>
        <Text style={{ color: colors.ink }}>Your reference number:</Text>
        <Text style={{ fontFamily: serif, fontSize: 34, color: colors.bottle }} selectable>
          {reference}
        </Text>
        <Text style={{ color: colors.ink }}>We reply within one working day.</Text>
        <Button
          label="Track this application"
          onPress={() => router.push({ pathname: "/track", params: { reference } })}
        />
        <Button
          variant="outline"
          label="New request"
          onPress={() => {
            setReference("");
            setName(""); setEmail(""); setPhone(""); setCount("1");
          }}
        />
      </View>
    );
  }

  const err = (k: string) =>
    errors[k] ? <Text style={{ marginTop: 6, color: colors.error }}>{errors[k]}</Text> : null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
      >
        <Text style={{ fontFamily: serif, fontSize: 28, color: colors.ink }}>
          Request a quote
        </Text>
        <Text style={{ marginTop: 8, color: colors.ink }}>
          Do not include passport or ID numbers here. We will ask for documents
          securely after confirming.
        </Text>

        {errors._ ? (
          <Text accessibilityRole="alert" style={{ marginTop: 14, color: colors.error }}>
            {errors._}
          </Text>
        ) : null}

        <Label>Service</Label>
        <ChipGroup options={services} value={service} onChange={setService} />
        {err("service")}

        <Label>Document category</Label>
        <ChipGroup options={CATEGORIES} value={category} onChange={setCategory} />
        {err("category")}

        <Label>Destination country</Label>
        <ChipGroup options={COUNTRIES} value={country} onChange={setCountry} />
        {err("country")}

        <Label>Purpose</Label>
        <ChipGroup options={PURPOSES} value={purpose} onChange={setPurpose} />
        {err("purpose")}

        <Label>Processing</Label>
        <ChipGroup options={["standard", "urgent"]} value={urgency} onChange={setUrgency} />
        {err("urgency")}

        <Input label="Number of documents" value={count} onChangeText={setCount} keyboardType="number-pad" />
        {err("count")}

        <Input label="Full name" value={name} onChangeText={setName} autoCapitalize="words" />
        {err("name")}

        <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
        {err("email")}

        <Input label="Phone (optional)" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        {err("phone")}

        <View style={{ marginTop: 28 }}>
          <Button label={sending ? "Sending" : "Request a quote"} onPress={send} disabled={sending} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}