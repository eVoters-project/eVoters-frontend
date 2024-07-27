import { VoterLeaderSubInterface } from "../voter-leader-sub/voter-leader-sub.interface";

export interface VoterLeaderInterface {
    code: string;
    description: string;
    status: string;
    remarks: string;
    voter_leader_sub: Partial<VoterLeaderSubInterface>;
}