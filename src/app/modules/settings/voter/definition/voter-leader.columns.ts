import { nameOf } from "../../../../helpers";
import { VoterLeaderInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const VoterLeaderColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<VoterLeaderInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Description',
    field: nameOf<VoterLeaderInterface>((obj) => obj.description),
    width: 'auto'
  }
];
