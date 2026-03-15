import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch } from "react-redux";
import {
    BORDER_RADIUS,
    COLORS,
    FONT_SIZES,
    SHADOW,
    SPACING,
} from "../constants/theme";
import { addItem } from "../redux/slices/shoppingSlice";

interface AddItemFormProps {
  category: string;
  onClose: () => void;
}

const UNITS = ["kg", "g", "lb", "oz", "L", "ml", "pcs", "dozen"];

export default function AddItemForm({ category, onClose }: AddItemFormProps) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("kg");

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert("Missing info", "Please enter an item name.");
      return;
    }
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      Alert.alert("Invalid quantity", "Enter a valid quantity.");
      return;
    }
    const prc = parseFloat(price);
    if (isNaN(prc) || prc < 0) {
      Alert.alert("Invalid price", "Enter a valid price.");
      return;
    }
    dispatch(
      addItem({ name: name.trim(), quantity: qty, price: prc, unit, category }),
    );
    onClose();
  };

  const estimatedTotal =
    quantity &&
    price &&
    !isNaN(parseFloat(quantity)) &&
    !isNaN(parseFloat(price))
      ? (parseFloat(quantity) * parseFloat(price)).toFixed(2)
      : null;

  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Add Item</Text>
              <Text style={styles.subtitle}>Fill in the details below</Text>
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>
              Item Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Bananas, Bread..."
              placeholderTextColor={COLORS.textMuted}
              value={name}
              onChangeText={setName}
              autoFocus
            />

            <View style={styles.rowContainer}>
              <View style={styles.flex2}>
                <Text style={styles.label}>
                  Quantity <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="1"
                  placeholderTextColor={COLORS.textMuted}
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.flex1}>
                <Text style={styles.label}>Unit</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.unitList}
                >
                  {UNITS.map((u) => (
                    <TouchableOpacity
                      key={u}
                      style={[
                        styles.unitChip,
                        u === unit && styles.unitChipActive,
                      ]}
                      onPress={() => setUnit(u)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.unitChipText,
                          u === unit && styles.unitChipTextActive,
                        ]}
                      >
                        {u}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <Text style={styles.label}>
              Price per {unit} <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.priceRow}>
              <View style={styles.currencyBox}>
                <Text style={styles.currency}>R</Text>
              </View>
              <TextInput
                style={styles.priceInput}
                placeholder="0.00"
                placeholderTextColor={COLORS.textMuted}
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
              />
            </View>

            {estimatedTotal && (
              <View style={styles.totalPreview}>
                <Text style={styles.totalLabel}>Estimated Total</Text>
                <Text style={styles.totalValue}>R{estimatedTotal}</Text>
              </View>
            )}
            <View style={{ height: SPACING.lg }} />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={handleSubmit}
              activeOpacity={0.85}
            >
              <Text style={styles.addBtnText}>Add to List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    maxHeight: "92%",
    ...SHADOW.lg,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    alignSelf: "center",
    marginTop: SPACING.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  title: { fontSize: FONT_SIZES.xl, fontWeight: "800", color: COLORS.text },
  subtitle: { fontSize: FONT_SIZES.sm, color: COLORS.textMuted, marginTop: 2 },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surfaceAlt,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  closeIcon: { fontSize: 13, color: COLORS.textSecondary, fontWeight: "700" },
  body: { padding: SPACING.lg },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.xs,
    marginTop: SPACING.md,
  },
  required: { color: COLORS.danger },
  input: {
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  rowContainer: {
    flexDirection: "row",
    gap: SPACING.md,
    alignItems: "flex-start",
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  unitList: { gap: SPACING.xs, paddingVertical: 2 },
  unitChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceAlt,
  },
  unitChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  unitChipText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  unitChipTextActive: { color: "#fff" },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    overflow: "hidden",
  },
  currencyBox: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  currency: {
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  priceInput: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  totalPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.md,
    backgroundColor: COLORS.primaryLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  totalLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primaryDark,
    fontWeight: "600",
  },
  totalValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "800",
    color: COLORS.primary,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  cancelText: {
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  addBtn: {
    flex: 2,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    ...SHADOW.sm,
  },
  addBtnText: { fontSize: FONT_SIZES.md, fontWeight: "700", color: "#fff" },
});
