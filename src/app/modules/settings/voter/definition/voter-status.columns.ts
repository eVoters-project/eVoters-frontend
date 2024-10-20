import { nameOf } from "../../../../helpers";
import { VoterStatusInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const VoterStatusColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<VoterStatusInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Description',
    field: nameOf<VoterStatusInterface>((obj) => obj.description),
    width: 'auto'
  }
];
