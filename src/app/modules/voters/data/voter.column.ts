import { TableColumnInterface } from "../../../shared/interface";
import { VotersInterface } from "../interface";

export const VoterColumns: TableColumnInterface[] = [
  {
    header: 'Precinct No.',
    field: (element: VotersInterface) => element.precinct_no
  },
  {
    header: 'Last Name',
    field: (element: VotersInterface) => element.last_name
  },
  {
    header: 'First Name & Middle Name',
    field: (element: VotersInterface) => `${element.first_name} ${element.middle_name}`
  },
  {
    header: 'Contact No.',
    field: (element: VotersInterface) => element.contact_no
  },
  {
    header: 'Barangay',
    field: (element: VotersInterface) => element.barangay
  },
  {
    header: 'Purok',
    field: (element: VotersInterface) => element.purok
  },
  {
    header: 'Party',
    field: (element: VotersInterface) => element.party
  },
  {
    header: 'Group',
    field: (element: VotersInterface) => element.group
  }
]
