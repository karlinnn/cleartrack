import { Platform } from "react-native";

export const colors = {
  ink: "#10231F",
  paper: "#F1F3EF",
  bottle: "#1F4D43",
  brass: "#B28A2E",
  rule: "#C9D0CA",
  white: "#FFFFFF",
  error: "#9B2C2C",
};

export const serif = Platform.select({ ios: "Georgia", default: "serif" });