import { nameOf } from "../../../../helpers";
import { VoterTypeInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const VoterTypeColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<VoterTypeInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Description',
    field: nameOf<VoterTypeInterface>((obj) => obj.description),
    width: 'auto'
  }
];
