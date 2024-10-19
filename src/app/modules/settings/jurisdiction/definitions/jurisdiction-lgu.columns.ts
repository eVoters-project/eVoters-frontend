import { nameOf } from "../../../../helpers";
import { LGUInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const JurisdictionLguColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<LGUInterface>((obj) => obj.code)
  },
  {
    header: 'Name',
    field: nameOf<LGUInterface>((obj) => obj.name)
  }
]
