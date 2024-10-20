import { nameOf } from "../../../../helpers";
import { VoterInfluenceSubInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const VoterInfluenceSubColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<VoterInfluenceSubInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Description',
    field: nameOf<VoterInfluenceSubInterface>((obj) => obj.description),
    width: 'auto'
  }
];
