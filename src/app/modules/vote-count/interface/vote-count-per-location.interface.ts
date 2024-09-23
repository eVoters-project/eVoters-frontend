import { VoteCountCandidateInterface } from "./vote-count-candidate.interface";

export interface VoteCountPerLocationInterface {
  positionId: string;
  position: string;
  candidates: VoteCountCandidateInterface[];
}

