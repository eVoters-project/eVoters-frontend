import { nameOf } from "../../../../helpers";
import { ElectionScheduleInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const ElectionScheduleColumns: TableColumnInterface[] = [
  {
    header: 'Date',
    field: nameOf<ElectionScheduleInterface>((obj) => obj.date),
    width: '120px'
  },
  {
    header: 'Election Of',
    field: nameOf<ElectionScheduleInterface>((obj) => obj.type),
    width: 'auto'
  },
  {
    header: 'Remarks',
    field: nameOf<ElectionScheduleInterface>((obj) => obj.remarks),
    width: 'auto'
  }
];
