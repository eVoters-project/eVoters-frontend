import { nameOf } from "../../../../helpers";
import { ProvinceInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const JurisdictionProvinceColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<ProvinceInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Name',
    field: nameOf<ProvinceInterface>((obj) => obj.name),
    width: 'auto'
  }
]
