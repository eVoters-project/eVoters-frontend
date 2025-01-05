export interface ResponseVoteTallyInterface {
  id: string;
  date: Date;
  candidate: string;
  candidate_type: string; // tihs would be for independent or a party candidate place holder
  precinct: string;
  count: number;
}
