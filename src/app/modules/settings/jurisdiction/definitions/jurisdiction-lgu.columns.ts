import { nameOf } from "../../../../helpers";
import { LGUInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const JurisdictionLguColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<LGUInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Name',
    field: nameOf<LGUInterface>((obj) => obj.name),
    width: 'auto'
  }
]
