import { RouterLinkActiveOptionsInterface } from "./router-link-active-option.interface";

export interface MenuItemInterface {
  label: string;
  icon: string;
  items?: MenuItemInterface[];
  routerLink?: string[];
  routerLinkActiveOptions?: RouterLinkActiveOptionsInterface
}
