import { MENU_DATA } from '../data/menuData.js';

// Pre-indexed Map for O(1) item lookups by ID
const itemMap = new Map();
MENU_DATA.forEach((item) => {
  itemMap.set(item._id, item);
  // Also index numeric ID suffix if searched
  const numId = item._id.replace('menu-', '');
  itemMap.set(numId, item);
});

/**
 * Retrieve menu items with optimized in-memory filtering.
 * @param {Object} options
 * @param {string} [options.category] - Filter by category name or 'All'
 * @param {boolean|string} [options.featured] - Filter by featured status
 * @param {string} [options.search] - Search keyword across name, description, category
 * @param {boolean} [options.vegetarian] - Filter for vegetarian only
 * @param {string} [options.sortBy] - 'price-asc', 'price-desc', 'name'
 * @param {number} [options.limit] - Max items to return
 * @returns {Promise<Array>}
 */
export const getMenuItems = async (options = {}) => {
  const { category, featured, search, vegetarian, sortBy, limit } = options;

  let results = [...MENU_DATA];

  // 1. Category Filter (Case-insensitive)
  if (category && category.trim() !== '' && category.toLowerCase() !== 'all') {
    const targetCategory = category.trim().toLowerCase();
    results = results.filter((item) => item.category.toLowerCase() === targetCategory);
  }

  // 2. Featured Filter
  if (featured !== undefined) {
    const isFeatured = featured === true || featured === 'true';
    results = results.filter((item) => item.featured === isFeatured);
  }

  // 3. Vegetarian Filter
  if (vegetarian !== undefined && (vegetarian === true || vegetarian === 'true')) {
    results = results.filter((item) => item.vegetarian === true);
  }

  // 4. Keyword Search (Matches item name or description)
  if (search && search.trim() !== '') {
    const query = search.trim().toLowerCase();
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }

  // 5. Sorting
  if (sortBy) {
    if (sortBy === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  // 6. Limit
  if (typeof limit === 'number' && limit > 0) {
    results = results.slice(0, limit);
  }

  // Return resolved promise immediately (zero latency)
  return results;
};

/**
 * Retrieve a single menu item by ID (O(1) Map lookup)
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export const getMenuItem = async (id) => {
  if (!id) return null;
  return itemMap.get(id) || null;
};

/**
 * Retrieve menu items by category
 * @param {string} category
 * @returns {Promise<Array>}
 */
export const getMenuItemsByCategory = async (category) => {
  return getMenuItems({ category });
};

/**
 * Retrieve list of unique categories
 * @returns {Array<string>}
 */
export const getAllCategories = () => {
  const unique = new Set(MENU_DATA.map((item) => item.category));
  return ['All', ...Array.from(unique)];
};
