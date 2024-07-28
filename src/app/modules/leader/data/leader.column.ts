import { nameOf } from "../../../helpers";
import { ResponseLeaderInterface } from "../../../interface";
import { LeaderInterface } from "../../../interface/modules/leader/leader.interface";
import { TableColumnInterface } from "../../../shared/interface";

export const LeaderGridColumns: TableColumnInterface[] = [
  {
    header: 'Leader',
    field: nameOf<ResponseLeaderInterface>((obj) => obj.voter)
  },
  {
    header: 'Type',
    field: nameOf<ResponseLeaderInterface>((obj) => obj.voter_leader)
  },
  {
    header: 'Status',
    field: nameOf<ResponseLeaderInterface>((obj) => obj.status)
  }
]
