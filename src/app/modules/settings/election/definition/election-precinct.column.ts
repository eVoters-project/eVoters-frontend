import { nameOf } from "../../../../helpers";
import { ElectionPrecinctInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const ElectionPrecinctColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<ElectionPrecinctInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Cluster',
    field: nameOf<ElectionPrecinctInterface>((obj) => obj.cluster),
    width: 'auto'
  },
  {
    header: 'Sub Cluster',
    field: nameOf<ElectionPrecinctInterface>((obj) => obj.sub_cluster),
    width: 'auto'
  },
  {
    header: 'Barangay',
    field: nameOf<ElectionPrecinctInterface>((obj) => obj.barangay),
    width: 'auto'
  },
  {
    header: 'Polling Center',
    field: nameOf<ElectionPrecinctInterface>((obj) => obj.polling_center),
    width: 'auto'
  }
];
