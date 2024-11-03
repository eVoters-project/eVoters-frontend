import { nameOf } from "../../../../helpers";
import { ElectionPositionInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const ElectionPositionColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<ElectionPositionInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Name',
    field: nameOf<ElectionPositionInterface>((obj) => obj.name),
    width: 'auto'
  }
];
