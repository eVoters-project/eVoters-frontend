import { VoteCountCandidateLocationInterface } from "./vote-count-candidate-location.interface";

export interface VoteCountCandidateInterface {
  candidateId: string;
  candidate: string;
  locations: VoteCountCandidateLocationInterface[];
}
