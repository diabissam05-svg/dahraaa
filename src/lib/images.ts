/**
 * Centralized image URL map. Every broken local path (/images/...) is mapped
 * to a working Pexels stock photo URL so images render across the whole app.
 *
 * Usage: import { img } from "../lib/images"; img("hero-desert")
 */

const IMAGES: Record<string, string> = {
  // Hero backgrounds
  "hero-dual-4x4": "https://images.pexels.com/photos/10658203/pexels-photo-10658203.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "hero-mud": "https://images.pexels.com/photos/11823963/pexels-photo-11823963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "hero-desert": "https://images.pexels.com/photos/5661743/pexels-photo-5661743.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",

  // Category images
  "cat-suspension": "https://images.pexels.com/photos/10912797/pexels-photo-10912797.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "cat-bullbar": "https://images.pexels.com/photos/11143670/pexels-photo-11143670.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "cat-roofrack": "https://images.pexels.com/photos/39647024/pexels-photo-39647024.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "cat-snorkel": "https://images.pexels.com/photos/9781802/pexels-photo-9781802.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "cat-recovery": "https://images.pexels.com/photos/11143670/pexels-photo-11143670.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "cat-camping": "https://images.pexels.com/photos/4310369/pexels-photo-4310369.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "cat-lighting": "https://images.pexels.com/photos/35153444/pexels-photo-35153444.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "cat-tires": "https://images.pexels.com/photos/11794391/pexels-photo-11794391.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",

  // About / workshop
  "about-workshop": "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",

  // Logo
  "logo-dahra": "https://images.pexels.com/photos/17357682/pexels-photo-17357682.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",

  // Visualizer vehicle bases
  "viz-base-hilux": "https://images.pexels.com/photos/20137063/pexels-photo-20137063.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
  "viz-base-ranger": "https://images.pexels.com/photos/10842901/pexels-photo-10842901.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
  "viz-base-patrol": "https://images.pexels.com/photos/4257670/pexels-photo-4257670.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",

  // Visualizer accessories (reuse category images as stand-ins)
  "viz-acc-bullbar": "https://images.pexels.com/photos/11143670/pexels-photo-11143670.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  "viz-acc-tent": "https://images.pexels.com/photos/39647024/pexels-photo-39647024.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  "viz-acc-ledbar": "https://images.pexels.com/photos/35153444/pexels-photo-35153444.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
};

/**
 * Resolve an image key to its URL. Accepts either a bare key ("hero-desert")
 * or a legacy local path ("/images/hero-desert.jpg"). Falls back to the
 * desert hero image if the key is unknown so nothing ever renders broken.
 */
export function img(key: string): string {
  if (!key) return IMAGES["hero-desert"];
  // If it's already a full URL (https://…), return as-is
  if (key.startsWith("http")) return key;
  // Strip /images/ prefix and file extension
  const clean = key
    .replace(/^\/images\//, "")
    .replace(/\.(jpg|jpeg|png|webp|mp4)$/i, "");
  return IMAGES[clean] ?? IMAGES["hero-desert"];
}
