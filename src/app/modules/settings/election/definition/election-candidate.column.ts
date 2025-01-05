import { nameOf } from "../../../../helpers";
import { ElectionCandidateInterface } from "../../../../interface";
import { TableColumnInterface } from "../../../../shared/interface";

export const ElectionCandidateColumn: TableColumnInterface[] = [
  {
    header: 'Code',
    field: nameOf<ElectionCandidateInterface>((obj) => obj.date),
    width: '120px'
  },
  {
    header: 'Position',
    field: nameOf<ElectionCandidateInterface>((obj) => obj.position),
    width: 'auto'
  },
  {
    header: 'Party Member',
    field: nameOf<ElectionCandidateInterface>((obj) => obj.party_member),
    width: 'auto'
  },
  {
    header: 'Voter',
    field: nameOf<ElectionCandidateInterface>((obj) => obj.voter),
    width: 'auto'
  },
  {
    header: 'Status',
    field: nameOf<ElectionCandidateInterface>((obj) => obj.status),
    width: 'auto'
  }
];
