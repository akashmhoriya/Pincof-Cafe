// PINCOF Contact & Reservation Inquiries Service (Optimized Client-Side)
const STORAGE_KEY = 'pincof_contact_messages';

/**
 * Validate and submit a contact message, saving to localStorage.
 * Includes a subtle realistic micro-delay (350ms) to ensure smooth UI spinner/animations.
 * @param {Object} formData
 * @param {string} formData.name
 * @param {string} formData.email
 * @param {string} [formData.phone]
 * @param {string} formData.subject
 * @param {string} formData.message
 * @returns {Promise<Object>}
 */
export const submitContactForm = async (formData) => {
  const { name, email, phone, subject, message } = formData;

  // 1. Validation: Required fields
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !subject.trim() ||
    !message.trim()
  ) {
    throw new Error('Please provide all required fields: name, email, subject, and message.');
  }

  // 2. Validation: Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    throw new Error('Please enter a valid email address.');
  }

  // 3. Construct message record
  const newEntry = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: typeof phone === 'string' ? phone.trim() : '',
    subject: subject.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  // 4. Subtle micro-delay to let UI button spinner render naturally
  await new Promise((resolve) => setTimeout(resolve, 350));

  // 5. Persist to localStorage safely
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const messages = existingRaw ? JSON.parse(existingRaw) : [];
    messages.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (storageError) {
    console.warn('[ContactService]: localStorage unavailable or quota exceeded:', storageError);
  }

  return {
    success: true,
    message: 'Thank you! Your message has been received. Our team will reach out shortly.',
    data: newEntry,
  };
};

/**
 * Retrieve all contact messages saved in localStorage.
 * @returns {Array<Object>}
 */
export const getStoredContactMessages = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('[ContactService]: Could not read stored messages:', err);
    return [];
  }
};

/**
 * Clear all stored contact messages.
 */
export const clearStoredContactMessages = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('[ContactService]: Could not clear stored messages:', err);
  }
};
