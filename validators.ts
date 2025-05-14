// @/lib/validators.ts

import { z } from 'zod';

/**
 * A utility function to format numbers to 2 decimal places
 * Used in currency validation
 */
const formatNumberWithDecimal = (value: number): string => {
  return value.toFixed(2);
};

/**
 * Currency schema: checks if a string is a valid currency format (e.g., "19.99")
 */
export const currency = z.string().refine(
  (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
  { message: 'Invalid currency format' }
);

/**
 * Sign-in schema for validating user login form
 */
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;

/**
 * Insert Order schema for order validation before saving to database
 */
export const insertOrderSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  shippingAddress: z.string().min(1, 'Shipping address is required'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
