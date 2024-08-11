export interface VoterInterface {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  nickname: string;
  gender: string;
  date_of_birth: Date;
  address: string;
  precinct_no: string;
  vin_no: string;
  status: string;
  category: string;
  vote_group: string;
  vote_type: string;
  vote_status: string;
  longitude: string;
  latitude: string;
  verified: boolean;
  confirmed: boolean;
  unassigned: boolean;
}
