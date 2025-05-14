// lib/sanity.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Environment-based values
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pux4p4jv';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2023-01-01'; // Lock version for stability

// Create Sanity client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Fast, public data only
});

// Image URL builder
const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}
