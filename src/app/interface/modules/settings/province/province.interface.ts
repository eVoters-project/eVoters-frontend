import { RegionInterface } from "../region/region.interface";

export interface ProvinceInterface {
  id: string;
  code: string;
  name: string;
  area_region: Partial<RegionInterface>;
  status: string;
}
