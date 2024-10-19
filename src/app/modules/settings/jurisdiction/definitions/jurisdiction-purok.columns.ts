import { nameOf } from "../../../../helpers";
import { PurokInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const JurisdictionPurokColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<PurokInterface>((obj) => obj.code)
  },
  {
    header: 'Name',
    field: nameOf<PurokInterface>((obj) => obj.name)
  }
]
