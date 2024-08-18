import { ProvinceInterface } from "../province/province.interface";

export interface LGUInterface {
  id: string;
  code: string;
  name: string;
  area_province: Partial<ProvinceInterface>;
  status: string;
}
