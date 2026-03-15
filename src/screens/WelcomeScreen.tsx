import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    BORDER_RADIUS,
    COLORS,
    FONT_SIZES,
    SHADOW,
    SPACING,
} from "../constants/theme";
import { RootStackParamList } from "../navigation/AppNavigator";

type WelcomeNav = NativeStackNavigationProp<RootStackParamList, "Welcome">;

const { width } = Dimensions.get("window");

const FEATURES = [
  { icon: "🛒", label: "Organised Lists", desc: "Items grouped by category" },
  { icon: "✅", label: "Track Progress", desc: "Check off as you shop" },
  { icon: "💰", label: "Cost Estimates", desc: "Know your budget upfront" },
];

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeNav>();

  // Animations
  const fadeTop = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;
  const fadeCards = useRef(new Animated.Value(0)).current;
  const fadeCta = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeTop, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(slideUp, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(fadeCards, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeCta, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background blobs */}
      <View style={styles.blobTL} />
      <View style={styles.blobBR} />

      {/* Hero */}
      <Animated.View
        style={[
          styles.hero,
          { opacity: fadeTop, transform: [{ translateY: slideUp }] },
        ]}
      >
        <View style={styles.iconWrapper}>
          <Text style={styles.iconEmoji}>🛍️</Text>
        </View>
        <Text style={styles.greeting}>Welcome!</Text>
        <Text style={styles.appName}>ShopSmart</Text>
        <Text style={styles.tagline}>
          Your personal shopping companion.{"\n"}Smart lists, stress-free
          shopping.
        </Text>
      </Animated.View>

      {/* Feature cards */}
      <Animated.View style={[styles.features, { opacity: fadeCards }]}>
        {FEATURES.map((f) => (
          <View key={f.label} style={styles.featureCard}>
            <Text style={styles.featureIcon}>{f.icon}</Text>
            <View>
              <Text style={styles.featureLabel}>{f.label}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          </View>
        ))}
      </Animated.View>

      {/* CTA */}
      <Animated.View style={[styles.cta, { opacity: fadeCta }]}>
        <TouchableOpacity
          style={styles.primaryBtn}
          activeOpacity={0.85}
          onPress={() => navigation.replace("Categories")}
        >
          <Text style={styles.primaryBtnText}>Get Started →</Text>
        </TouchableOpacity>
        <Text style={styles.hint}>Your lists are saved automatically</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.headerBg,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
    overflow: "hidden",
  },

  // Decorative blobs
  blobTL: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: COLORS.primary,
    opacity: 0.18,
  },
  blobBR: {
    position: "absolute",
    bottom: -100,
    right: -60,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.accent,
    opacity: 0.12,
  },

  // Hero
  hero: { alignItems: "center", marginTop: SPACING.xl },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: "rgba(22,163,74,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  iconEmoji: { fontSize: 52 },
  greeting: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.primaryLight,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  appName: {
    fontSize: 46,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -1,
    marginTop: 4,
  },
  tagline: {
    fontSize: FONT_SIZES.md,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: SPACING.sm,
    lineHeight: 22,
  },

  // Features
  features: { width: "100%", gap: SPACING.sm },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  featureIcon: { fontSize: 28, width: 44, textAlign: "center" },
  featureLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
    color: "#ffffff",
  },
  featureDesc: { fontSize: FONT_SIZES.sm, color: "#94a3b8", marginTop: 2 },

  // CTA
  cta: { width: "100%", alignItems: "center", gap: SPACING.sm },
  primaryBtn: {
    width: "100%",
    paddingVertical: SPACING.md + 2,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    ...SHADOW.md,
  },
  primaryBtnText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  hint: { fontSize: FONT_SIZES.sm, color: "#475569" },
});
