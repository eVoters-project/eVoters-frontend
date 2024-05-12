import { MenuItemInterface } from "./menu-item.interface";

export interface MenuInterface {
  label: string;
  visible: boolean;
  items: MenuItemInterface[]
}
