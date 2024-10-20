import { nameOf } from "../../../../helpers";
import { VoterPositionInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const VoterPositionColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<VoterPositionInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Description',
    field: nameOf<VoterPositionInterface>((obj) => obj.description),
    width: 'auto'
  }
];
