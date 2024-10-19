import { nameOf } from "../../../../helpers";
import { ProvinceInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const JurisdictionProvinceColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<ProvinceInterface>((obj) => obj.code)
  },
  {
    header: 'Name',
    field: nameOf<ProvinceInterface>((obj) => obj.name)
  }
]
