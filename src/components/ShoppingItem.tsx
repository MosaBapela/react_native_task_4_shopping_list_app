import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import {
    BORDER_RADIUS,
    COLORS,
    FONT_SIZES,
    SHADOW,
    SPACING,
} from "../constants/theme";
import { deleteItem, togglePurchased } from "../redux/slices/shoppingSlice";
import { ShoppingItem as ShoppingItemType } from "../types/index";

interface ShoppingItemProps {
  item: ShoppingItemType;
  onEdit: () => void;
}

export default function ShoppingItem({ item, onEdit }: ShoppingItemProps) {
  const dispatch = useDispatch();

  const handleTogglePurchased = () => {
    dispatch(togglePurchased(item.id));
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => dispatch(deleteItem(item.id)),
        },
      ],
    );
  };

  const total = (item.quantity * item.price).toFixed(2);

  return (
    <View
      style={[styles.container, item.isPurchased && styles.containerPurchased]}
    >
      <TouchableOpacity
        style={[styles.checkbox, item.isPurchased && styles.checkboxChecked]}
        onPress={handleTogglePurchased}
        activeOpacity={0.7}
      >
        {item.isPurchased && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.details}>
        <Text
          style={[styles.name, item.isPurchased && styles.namePurchased]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {item.quantity} {item.unit}
            </Text>
          </View>
          <Text style={styles.price}>
            R{item.price.toFixed(2)}/{item.unit}
          </Text>
        </View>
        <Text style={[styles.total, item.isPurchased && styles.totalPurchased]}>
          R{total}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={onEdit}
          activeOpacity={0.7}
        >
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  containerPurchased: {
    backgroundColor: COLORS.purchased,
    borderColor: COLORS.primaryLight,
    opacity: 0.85,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  checkboxChecked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  namePurchased: {
    textDecorationLine: "line-through",
    color: COLORS.purchasedText,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: 3,
  },
  badge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.full,
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primaryDark,
    fontWeight: "600",
  },
  price: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  total: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "700",
    color: COLORS.primary,
  },
  totalPurchased: {
    color: COLORS.purchasedText,
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  editButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editIcon: {
    fontSize: 15,
  },
  deleteButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dangerLight,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: "#fca5a5",
  },
  deleteIcon: {
    fontSize: 15,
  },
});
