import { nameOf } from "../../../../helpers";
import { PositionInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const PositionColumns: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<PositionInterface>((obj) => obj.code),
    width: '120px'
  },
  {
    header: 'Name',
    field: nameOf<PositionInterface>((obj) => obj.name),
    width: 'auto'
  },
  {
    header: 'Description',
    field: nameOf<PositionInterface>((obj) => obj.description),
    width: 'auto'
  },
  {
    header: 'Level',
    field: nameOf<PositionInterface>((obj) => obj.level),
    width: 'auto'
  },
  {
    header: 'Election Cycle',
    field: nameOf<PositionInterface>((obj) => obj.election_cycle),
    width: 'auto'
  },
  {
    header: 'Status',
    field: nameOf<PositionInterface>((obj) => obj.status),
    width: 'auto'
  }
];