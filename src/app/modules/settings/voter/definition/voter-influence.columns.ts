import { nameOf } from "../../../../helpers";
import { VoterInfluenceInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const VoterInfluenceColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<VoterInfluenceInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Description',
    field: nameOf<VoterInfluenceInterface>((obj) => obj.description),
    width: 'auto'
  }
];
