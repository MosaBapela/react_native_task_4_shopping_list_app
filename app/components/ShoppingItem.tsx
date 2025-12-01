import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from '../constants/theme';
import { deleteItem, togglePurchased } from '../redux/slices/shoppingSlice';
import { ShoppingItem as ShoppingItemType } from '../types/index';

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
      'Delete Item',
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteItem(item.id)),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, item.isPurchased && styles.containerPurchased]}>
      {/* Checkbox */}
      <TouchableOpacity
        style={[styles.checkbox, item.isPurchased && styles.checkboxChecked]}
        onPress={handleTogglePurchased}
      >
        {item.isPurchased && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      {/* Item Details */}
      <View style={styles.details}>
        <Text style={[styles.name, item.isPurchased && styles.namePurchased]}>
          {item.name}
        </Text>
        <Text style={styles.info}>
          Qty: {item.quantity} {item.unit} • ${item.price.toFixed(2)}/{item.unit}
        </Text>
        <Text style={styles.total}>
          Total: ${(item.quantity * item.price).toFixed(2)}
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
          <Text style={styles.actionIcon}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
          <Text style={styles.actionIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  containerPurchased: {
    opacity: 0.6,
    backgroundColor: '#f1f5f9',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  checkboxChecked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  checkmark: {
    color: COLORS.cardBackground,
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  namePurchased: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  info: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  total: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  actionButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.sm,
  },
  actionIcon: {
    fontSize: 18,
  },
});