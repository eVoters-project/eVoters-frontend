import { nameOf } from "../../helpers";
import { PartyInterface } from "../../interface/modules/party/party.interface";
import { TableColumnInterface } from "../../shared/interface";

export const PartyGridColumns: TableColumnInterface[] = [
  {
    header: 'Name',
    field: nameOf<PartyInterface>((obj) => obj.name)
  },
  {
    header: 'Description',
    field: nameOf<PartyInterface>((obj) => obj.description)
  },
  {
    header: 'status',
    field: nameOf<PartyInterface>((obj) => obj.status)
  }
]
