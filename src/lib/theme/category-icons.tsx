import {
  Code,
  TextAa,
  ImageSquare,
  FileText,
  Ruler,
  Buildings,
  House,
  Megaphone,
  Clock,
  PaintBrush,
  CookingPot,
  Coins,
  Heartbeat,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon, IconWeight } from "@phosphor-icons/react";

const categoryIconMap: Record<string, Icon> = {
  "developer-tools": Code,
  "text-tools": TextAa,
  "image-tools": ImageSquare,
  "document-tools": FileText,
  "unit-converters": Ruler,
  "construction-calculators": Buildings,
  "real-estate-calculators": House,
  "marketing-tools": Megaphone,
  "time-date-tools": Clock,
  "design-tools": PaintBrush,
  "kitchen-recipe-tools": CookingPot,
  "finance-calculators": Coins,
  "health-fitness-calculators": Heartbeat,
};

type CategoryIconProps = {
  slug: string;
  className?: string;
  weight?: IconWeight;
  size?: number;
};

export const CategoryIcon = ({
  slug,
  className,
  weight = "duotone",
  size,
}: CategoryIconProps) => {
  const IconComponent = categoryIconMap[slug] ?? categoryIconMap["developer-tools"];
  return (
    <IconComponent
      className={className}
      weight={weight}
      size={size}
      aria-hidden="true"
    />
  );
};

export const getCategoryIcon = (slug: string): Icon => {
  return categoryIconMap[slug] ?? categoryIconMap["developer-tools"];
};
