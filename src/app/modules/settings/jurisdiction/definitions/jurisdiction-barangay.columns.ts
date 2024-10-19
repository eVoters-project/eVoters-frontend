import { nameOf } from "../../../../helpers";
import { BarangayInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const JurisdictionBarangayColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<BarangayInterface>((obj) => obj.code),
    width: '150px'
  },
  {
    header: 'Name',
    field: nameOf<BarangayInterface>((obj) => obj.name),
    width: 'auto'
  }
];
