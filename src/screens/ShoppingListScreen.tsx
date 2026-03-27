import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddItemForm from "../components/AddItemForm";
import EditItemModal from "../components/EditItemModal";
import ShoppingItem from "../components/ShoppingItem";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SHADOW,
  SPACING,
} from "../constants/theme";
import { RootStackParamList } from "../navigation/AppNavigator";
import { clearPurchasedItems } from "../redux/slices/shoppingSlice";
import { RootState } from "../redux/store";
import { ShoppingItem as ShoppingItemType } from "../types/index";

type Props = NativeStackScreenProps<RootStackParamList, "ShoppingList">;

export default function ShoppingListScreen({ navigation, route }: Props) {
  const { category, categoryName } = route.params;
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItemType | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "pending" | "done">(
    "all",
  );

  const allItems = useSelector((state: RootState) => state.shopping.items);
  const categoryItems = allItems.filter((item) => item.category === category);

  const searchedItems = categoryItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredItems = searchedItems.filter((item) => {
    if (activeFilter === "pending") return !item.isPurchased;
    if (activeFilter === "done") return item.isPurchased;
    return true;
  });

  const totalItems = categoryItems.length;
  const purchasedItems = categoryItems.filter(
    (item) => item.isPurchased,
  ).length;
  const totalCost = categoryItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const progress = totalItems > 0 ? purchasedItems / totalItems : 0;

  const handleClearPurchased = () => {
    Alert.alert(
      "Clear Purchased Items",
      "Remove all purchased items from this list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => dispatch(clearPurchasedItems()),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerBg} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerCategory}>{categoryName}</Text>
          <Text style={styles.headerSub}>
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </Text>
        </View>
        {purchasedItems > 0 && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={handleClearPurchased}
            activeOpacity={0.7}
          >
            <Text style={styles.clearBtnText}>Clear ✓</Text>
          </TouchableOpacity>
        )}
        {purchasedItems === 0 && <View style={styles.headerPlaceholder} />}
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.round(progress * 100)}%` as any },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {purchasedItems}/{totalItems} done
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalItems}</Text>
          <Text style={styles.statLabel}>Items</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: COLORS.success }]}>
            {purchasedItems}
          </Text>
          <Text style={styles.statLabel}>Purchased</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: COLORS.accent }]}>
            R{totalCost.toFixed(2)}
          </Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search items..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Text style={styles.clearSearch}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filterRow}>
        {(["all", "pending", "done"] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterTab,
              activeFilter === f && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter(f)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === f && styles.filterTabTextActive,
              ]}
            >
              {f === "all" ? "All" : f === "pending" ? "Pending" : "Done"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>
              {searchQuery ? "🔎" : activeFilter === "done" ? "✅" : "🛒"}
            </Text>
            <Text style={styles.emptyTitle}>
              {searchQuery
                ? "No results"
                : activeFilter === "done"
                  ? "Nothing purchased yet"
                  : "Your list is empty"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery
                ? "Try a different search"
                : "Tap the + button to add items"}
            </Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <ShoppingItem
              key={item.id}
              item={item}
              onEdit={() => setEditingItem(item)}
            />
          ))
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddForm(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>

      {showAddForm && (
        <AddItemForm
          category={category}
          onClose={() => setShowAddForm(false)}
        />
      )}
      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 22,
    color: COLORS.headerText,
  },
  headerCenter: {
    flex: 1,
  },
  headerCategory: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
    color: COLORS.headerText,
  },
  headerSub: {
    fontSize: FONT_SIZES.xs,
    color: "rgba(255,255,255,0.6)",
    marginTop: 1,
  },
  headerPlaceholder: {
    width: 72,
  },
  clearBtn: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
  },
  clearBtnText: {
    color: "#fff",
    fontSize: FONT_SIZES.xs,
    fontWeight: "700",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    gap: SPACING.sm,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: BORDER_RADIUS.full,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
  },
  progressText: {
    fontSize: FONT_SIZES.xs,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "600",
    minWidth: 56,
    textAlign: "right",
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.sm,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: SPACING.sm,
  },
  searchRow: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.sm,
  },
  searchIcon: {
    fontSize: 15,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  clearSearch: {
    color: COLORS.textMuted,
    fontSize: 14,
    padding: 4,
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    gap: SPACING.sm,
  },
  filterTab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: "center",
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterTabText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  filterTabTextActive: {
    color: "#fff",
  },
  list: {
    flex: 1,
    marginTop: SPACING.sm,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: SPACING.xxl,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: SPACING.lg,
    right: SPACING.lg,
    width: 58,
    height: 58,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOW.lg,
  },
  fabIcon: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "300",
    lineHeight: 34,
  },
});
