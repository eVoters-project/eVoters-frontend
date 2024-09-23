import { nameOf } from "../../../helpers";
import { TableColumnInterface } from "../../../shared/interface";
import { PerRankInterface } from "../interface/per-rank.interface";

export const PerRankColumns: TableColumnInterface[] = [
  {
    header: 'Position',
    field: nameOf<PerRankInterface>((obj) => obj.position)
  }
]
