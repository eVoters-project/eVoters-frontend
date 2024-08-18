import { LGUInterface } from "../lgu/lgu.interface";

export interface BarangayInterface {
  id: string;
  code: string;
  name: string;
  area_lgu: Partial<LGUInterface>;
  status: string;
}
