/**
 * PINCOF Unified Client Data Service
 * 
 * Re-exports menu and contact operations powered by high-performance client-side
 * stores, eliminating the need for an external backend server while preserving
 * full backward compatibility.
 */

export {
  getMenuItems,
  getMenuItem,
  getMenuItemsByCategory,
  getAllCategories,
} from './menuService.js';

export {
  submitContactForm,
  getStoredContactMessages,
  clearStoredContactMessages,
} from './contactService.js';
