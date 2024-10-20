import { nameOf } from "../../../../helpers";
import { VoterLeaderSubInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const VoterLeaderSubColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<VoterLeaderSubInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Description',
    field: nameOf<VoterLeaderSubInterface>((obj) => obj.description),
    width: 'auto'
  }
];
