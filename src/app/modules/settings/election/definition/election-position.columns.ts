import { nameOf } from "../../../../helpers";
import { ElectionPositionInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const ElectionPositionColumns: TableColumnInterface[] = [
  {
    header: 'Election Schedule',
    field: nameOf<ElectionPositionInterface>((obj) => obj.schedule),
    width: 'auto'
  },
  {
    header: 'Position',
    field: nameOf<ElectionPositionInterface>((obj) => obj.name),
    width: 'auto'
  },
  {
    header: 'No. of Seat',
    field: nameOf<ElectionPositionInterface>((obj) => obj.seat),
    width: 'auto'
  }
];
