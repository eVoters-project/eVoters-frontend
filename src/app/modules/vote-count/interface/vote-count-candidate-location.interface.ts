import { VoteCountCandidateLocationPrecinctInterface } from "./vote-count-candidate-location-precinct.interface";

export interface VoteCountCandidateLocationInterface {
  locationId: string;
  location: string;
  precincts: VoteCountCandidateLocationPrecinctInterface[];
}
