import { nameOf } from "../../../helpers";
import { ResponseVoteTallyInterface } from "../../../interface";
import { TableColumnInterface } from "../../../shared/interface";

export const VoteTallyColumn: TableColumnInterface[] = [
  {
    header: 'Date',
    field: nameOf<ResponseVoteTallyInterface>((obj) => obj.date)
  },
  {
    header: 'Precinct',
    field: nameOf<ResponseVoteTallyInterface>((obj) => obj.precinct)
  },
  {
    header: 'Candidate',
    field: nameOf<ResponseVoteTallyInterface>((obj) => obj.candidate)
  },
  {
    header: 'Candidate Type',
    field: nameOf<ResponseVoteTallyInterface>((obj) => obj.candidate_type)
  },
  {
    header: 'Count',
    field: nameOf<ResponseVoteTallyInterface>((obj) => obj.count)
  }
]
