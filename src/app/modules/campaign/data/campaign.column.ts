import { nameOf } from "../../../helpers";
import { ResponseCampaignInterface } from "../../../interface";
import { TableColumnInterface } from "../../../shared/interface";

export const CampaignColumns: TableColumnInterface[] = [
  {
    header: 'What',
    field: nameOf<ResponseCampaignInterface>((obj) => obj.what)
  },
  {
    header: 'When',
    field: nameOf<ResponseCampaignInterface>((obj) => obj.when)
  },
  {
    header: 'Where',
    field: nameOf<ResponseCampaignInterface>((obj) => obj.where)
  },
  {
    header: 'Remarks',
    field: nameOf<ResponseCampaignInterface>((obj) => obj.remarks)
  },
  {
    header: 'Attendees',
    field: nameOf<ResponseCampaignInterface>((obj) => obj.attendees),
    width: '150px'
  }
]
