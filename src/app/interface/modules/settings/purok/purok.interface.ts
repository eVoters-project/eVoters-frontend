import { BarangayInterface } from "../barangay/barangay.interface";

export interface PurokInterface {
  id?: string | null;
  code?: string | null;
  name?: string | null;
  area_barangay?: any;
  status?: string | null;
}
