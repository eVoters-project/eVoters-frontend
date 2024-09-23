export interface PerRankInterface {
  positionId: string;
  position: string;
  candidates: CandidateInterface[];
}

interface CandidateInterface {
  candidateId: string;
  sequence: number;
  name: string;
  total: number;
  percentage: number;
  percentage_bar: any;
}
