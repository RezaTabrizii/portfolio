import type { Component } from 'vue'
import {
  Box,
  BriefcaseBusiness,
  Calendar,
  Clock3,
  CodeXml,
  FileDown,
  Github,
  GraduationCap,
  Languages,
  Link,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Server,
} from 'lucide-vue-next'

/**
 * Icons referenced from content data, keyed by their Lucide kebab name.
 * Explicit imports keep the bundle tree-shaken (no full icon set at runtime).
 */
export const icons = {
  'box': Box,
  'briefcase-business': BriefcaseBusiness,
  'calendar': Calendar,
  'clock-3': Clock3,
  'code-xml': CodeXml,
  'file-down': FileDown,
  'github': Github,
  'graduation-cap': GraduationCap,
  'languages': Languages,
  'link': Link,
  'linkedin': Linkedin,
  'mail': Mail,
  'map-pin': MapPin,
  'phone': Phone,
  'server': Server,
} as const satisfies Record<string, Component>

export type IconName = keyof typeof icons
