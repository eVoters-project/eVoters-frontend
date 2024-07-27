import { nameOf } from "../../../helpers/common.helpers";
import { VoterInterface } from "../../../interface";
import { TableColumnInterface } from "../../../shared/interface";

type voterKeys = keyof VoterInterface;

export const VoterColumns: TableColumnInterface[] = [
  {
    header: 'Precinct No.',
    field: nameOf<VoterInterface>((obj) => obj.precinct_no)
  },
  {
    header: 'Last Name',
    field: nameOf<VoterInterface>((obj) => obj.lastname)
  },
  {
    header: 'First Name',
    field: nameOf<VoterInterface>((obj) => obj.firstname)
  },
  {
    header: 'Middle Name',
    field: nameOf<VoterInterface>((obj) => obj.middlename)
  },
  {
    header: 'Status',
    field: nameOf<VoterInterface>((obj) => obj.vote_status)
  },
  {
    header: '',
    field: nameOf<VoterInterface>((obj) => obj.id)
  },
]
