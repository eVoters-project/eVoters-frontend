import { nameOf } from "../../../../helpers";
import { RegionInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const JurisdictionRegionColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<RegionInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Name',
    field: nameOf<RegionInterface>((obj) => obj.name),
    width: 'auto'
  }
]
