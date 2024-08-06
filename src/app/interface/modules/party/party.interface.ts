import { LeaderInterface } from "../leader/leader.interface";

export interface PartyInterface {
  id: string;
  code: string;
  name: string;
  description: string;
  remarks: string;
  leader: LeaderInterface;
  status: string;
}
