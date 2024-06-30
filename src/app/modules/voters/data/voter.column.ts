import { VoterInterface } from "../../../interface";
import { TableColumnInterface } from "../../../shared/interface";

export const VoterColumns: TableColumnInterface[] = [
  {
    header: 'Precinct No.',
    field: (element: VoterInterface) => element.precinct_no.toString()
  },
  {
    header: 'Last Name',
    field: 'lastname'
  },
  {
    header: 'First Name & Middle Name',
    field: (element: VoterInterface) => `${element.firstname} ${element.middlename}`
  }
]
