import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    BORDER_RADIUS,
    COLORS,
    FONT_SIZES,
    SHADOW,
    SPACING,
} from "../constants/theme";
import { Category } from "../types/index";

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.iconWrapper}>
        <Text style={styles.icon}>{category.icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {category.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {category.description}
        </Text>
      </View>
      <View style={styles.arrow}>
        <Text style={styles.arrowIcon}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOW.sm,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  icon: {
    fontSize: 26,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 2,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  arrow: {
    width: 28,
    height: 28,
    backgroundColor: COLORS.primaryLight,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SPACING.sm,
  },
  arrowIcon: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: "700",
    lineHeight: 22,
  },
});
