import { BarangayInterface } from "../barangay/barangay.interface";

export interface PurokInterface {
  id: string;
  code: string;
  name: string;
  area_barangay: Partial<BarangayInterface>;
  status: string;
}
