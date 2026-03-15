import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import CategoryCard from "../components/CategoryCard";
import {
    BORDER_RADIUS,
    CATEGORIES,
    COLORS,
    FONT_SIZES,
    SPACING
} from "../constants/theme";
import { RootStackParamList } from "../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Categories"
>;

export default function CategoriesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = CATEGORIES.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    navigation.navigate("ShoppingList", { category: categoryId, categoryName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerBg} />

      {/* Hero Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerGreeting}>Good day! 👋</Text>
            <Text style={styles.headerTitle}>What are you shopping for?</Text>
          </View>
          <View style={styles.cartBadgeContainer}>
            <Text style={styles.cartEmoji}>🛒</Text>
          </View>
        </View>

        {/* Search Bar inside header */}
        <View style={styles.searchWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories..."
            placeholderTextColor="rgba(255,255,255,0.6)"
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

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section label */}
        <Text style={styles.sectionLabel}>
          {searchQuery
            ? `${filteredCategories.length} result${filteredCategories.length !== 1 ? "s" : ""} found`
            : `${CATEGORIES.length} Categories Available`}
        </Text>

        {/* Category List */}
        {filteredCategories.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔎</Text>
            <Text style={styles.emptyText}>No categories found</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </View>
        ) : (
          filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={() => handleCategoryPress(category.id, category.name)}
            />
          ))
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.headerBg,
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    borderBottomLeftRadius: BORDER_RADIUS.xl,
    borderBottomRightRadius: BORDER_RADIUS.xl,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.md,
  },
  headerGreeting: {
    fontSize: FONT_SIZES.sm,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "700",
    color: COLORS.headerText,
    maxWidth: 240,
  },
  cartBadgeContainer: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: BORDER_RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
  },
  cartEmoji: {
    fontSize: 24,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  searchIcon: {
    fontSize: 16,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.headerText,
  },
  clearSearch: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    padding: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  sectionLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: SPACING.md,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: SPACING.xxl,
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptySubtext: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  bottomSpacer: {
    height: SPACING.xl,
  },
});
