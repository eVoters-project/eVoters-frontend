import { nameOf } from "../../../helpers/common.helpers";
import { ResponseVoterInterface, VoterInterface } from "../../../interface";
import { TableColumnInterface } from "../../../shared/interface";

type voterKeys = keyof ResponseVoterInterface;

export const VoterColumns: TableColumnInterface[] = [
  {
    header: 'Precinct No.',
    field: nameOf<ResponseVoterInterface>((obj) => obj.precinct_no)
  },
  {
    header: 'Last Name',
    field: nameOf<ResponseVoterInterface>((obj) => obj.lastname)
  },
  {
    header: 'First & Middle Name',
    field: nameOf<ResponseVoterInterface>((obj) => obj.firstname_middlename)
  },
  {
    header: 'Barangay',
    field: nameOf<ResponseVoterInterface>((obj) => obj.barangay)
  },
  {
    header: 'Purok',
    field: nameOf<ResponseVoterInterface>((obj) => obj.purok)
  },
  {
    header: 'Party',
    field: nameOf<ResponseVoterInterface>((obj) => obj.party)
  },
  {
    header: 'Group',
    field: nameOf<ResponseVoterInterface>((obj) => obj.group)
  },
  {
    header: 'Status',
    field: nameOf<ResponseVoterInterface>((obj) => obj.vote_status)
  },
  {
    header: 'id',
    field: nameOf<ResponseVoterInterface>((obj) => obj.id)
  },
]
