import { nameOf } from "../../../helpers";
import { ResponseCandidateInterface } from "../../../interface";
import { TableColumnInterface } from "../../../shared/interface";

export const CandidateColumns: TableColumnInterface[] = [
  {
    header: 'Schedule',
    field: nameOf<ResponseCandidateInterface>((obj) => obj.schedule)
  },
  {
    header: 'Position',
    field: nameOf<ResponseCandidateInterface>((obj) => obj.position)
  },
  {
    header: 'Candidate',
    field: nameOf<ResponseCandidateInterface>((obj) => obj.name)
  },
  {
    header: 'Type',
    field: nameOf<ResponseCandidateInterface>((obj) => obj.type)
  },
  {
    header: 'Status',
    field: nameOf<ResponseCandidateInterface>((obj) => obj.status)
  }
]
