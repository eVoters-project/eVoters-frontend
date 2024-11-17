export interface ElectionPrecinctInterface {
  id?: string | null;
  sequence?: number | null;
  code?: string | null;
  cluster?: number | null;
  sub_cluster?: string | null;
  polling_center?: string | null;
  barangay?: string | null;
  status?: string | null;
}
