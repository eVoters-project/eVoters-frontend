import { VoterLeaderSubInterface } from "../voter-leader-sub/voter-leader-sub.interface";

export interface VoterLeaderInterface {
  id?: string | null;
  code?: string | null;
  description?: string | null;
  status?: string | null;
  remarks?: string | null;
  voter_leader_sub?: any;
}
