import { VoterLeaderInterface } from "../settings/voter-leader/voter-leader.interface";
import { VoterInterface } from "../voter/voter.interface";

export interface LeaderInterface {
    voter: Partial<VoterInterface>
    voter_leader: Partial<VoterLeaderInterface>
    status: string;
}