import { nameOf } from "../../helpers";
import { ResponsePartyInterface } from "../../interface";
import { PartyInterface } from "../../interface/modules/party/party.interface";
import { TableColumnInterface } from "../../shared/interface";

export const PartyGridColumns: TableColumnInterface[] = [
  {
    header: 'Name',
    field: nameOf<ResponsePartyInterface>((obj) => obj.name)
  },
  {
    header: 'Leader',
    field: nameOf<ResponsePartyInterface>((obj) => obj.leader)
  },
  {
    header: 'Status',
    field: nameOf<ResponsePartyInterface>((obj) => obj.status)
  }
]
