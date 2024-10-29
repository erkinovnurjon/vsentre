import { type Menu } from "@/modules/basics";
import { Home, Package, Package2 } from "lucide-vue-next";

export const menus: Menu[] = [
  {
    name: "Products",
    to: "/products",
    childrenVisible: false,
    children: [],
    icon: Package2,
  },
  {
    name: "Overview",
    to: "/overview",
    childrenVisible: false,
    children: [],
    icon: Package,
  },
];
