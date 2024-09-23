import { nameOf } from "../../../helpers";
import { TableColumnInterface } from "../../../shared/interface";
import { VoteCountPerLocationInterface } from "../interface/vote-count-per-location.interface";

export const PerLocationColumns: TableColumnInterface[] = [
  {
    header: 'Position',
    field: nameOf<VoteCountPerLocationInterface>((obj) => obj.position)
  }
]
