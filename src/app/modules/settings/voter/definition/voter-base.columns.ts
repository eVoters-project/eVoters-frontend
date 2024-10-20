import { nameOf } from "../../../../helpers";
import { VoterBaseInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const VoterBaseColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<VoterBaseInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Description',
    field: nameOf<VoterBaseInterface>((obj) => obj.description),
    width: 'auto'
  }
];
