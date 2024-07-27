import { nameOf } from "../../../helpers";
import { LeaderInterface } from "../../../interface/modules/leader/leader.interface";
import { TableColumnInterface } from "../../../shared/interface";

export const LeaderGridColumns: TableColumnInterface[] = [
  {
    header: 'Leader',
    field: nameOf<LeaderInterface>((obj) => `${obj.voter.firstname} ${obj.voter.lastname}`)
  },
  {
    header: 'Type',
    field: nameOf<LeaderInterface>((obj) => `${obj.voter_leader}.${obj.voter_leader.description}`)
  },
  {
    header: 'Status',
    field: nameOf<LeaderInterface>((obj) => obj.status)
  }
]
