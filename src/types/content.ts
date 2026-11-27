import rawContent from '../content/content.json';

export type SiteContent = typeof rawContent;

export interface LightboxImage {
  src: string;
  caption?: string;
  label?: string;
}
