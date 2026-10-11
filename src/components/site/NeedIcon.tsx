import {
  BadgeCheck, BadgePercent, BookOpen, Box, Building2, Calculator, CalendarCheck, CalendarClock,
  CalendarDays, CalendarHeart, Camera, Clapperboard, ClipboardList, Cog, Factory, FileDown, FileText,
  Film, Gauge, Globe, Globe2, GraduationCap, Grid3x3, Heart, Images, LayoutGrid, LayoutPanelTop,
  ListChecks, ListOrdered, MapPin, MapPinned, MessageCircle, Package, PackageSearch, Palette, PenLine,
  PhoneCall, Plane, PlayCircle, Rotate3d, Ruler, ScanSearch, Scissors, Search, ShieldCheck, ShoppingBag,
  Sofa, Sparkles, SplitSquareHorizontal, Star, Store, Trophy, Users, UtensilsCrossed, Wrench, Zap,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  BadgeCheck, BadgePercent, BookOpen, Box, Building2, Calculator, CalendarCheck, CalendarClock,
  CalendarDays, CalendarHeart, Camera, Clapperboard, ClipboardList, Cog, Factory, FileDown, FileText,
  Film, Gauge, Globe, Globe2, GraduationCap, Grid3x3, Heart, Images, LayoutGrid, LayoutPanelTop,
  ListChecks, ListOrdered, MapPin, MapPinned, MessageCircle, Package, PackageSearch, Palette, PenLine,
  PhoneCall, Plane, PlayCircle, Rotate3d, Ruler, ScanSearch, Scissors, Search, ShieldCheck, ShoppingBag,
  Sofa, Sparkles, SplitSquareHorizontal, Star, Store, Trophy, Users, UtensilsCrossed, Wrench, Zap,
};

export function NeedIcon({ name, className = "size-5" }: { name: string; className?: string }) {
  const Icon = map[name] ?? Sparkles;
  return <Icon className={className} aria-hidden />;
}
