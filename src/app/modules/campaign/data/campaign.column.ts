import { TableColumnInterface } from "../../../shared/interface";
import { CampaignInterface } from "./interface";

export const CampaignColumns: TableColumnInterface[] = [
  {
    header: 'What',
    field: (element: CampaignInterface) => element.what
  },
  {
    header: 'What',
    field: (element: CampaignInterface) => element.when
  },
  {
    header: 'What',
    field: (element: CampaignInterface) => element.where
  },
  {
    header: 'Remarks',
    field: (element: CampaignInterface) => element.remarks
  },
  {
    header: 'Attendee',
    field: (element: CampaignInterface) => element.attendee
  }
]
