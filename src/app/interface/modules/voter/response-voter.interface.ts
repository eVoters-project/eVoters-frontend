export interface ResponseVoterInterface {
  id: string;
  precinct_no: string;
  lastname: string;
  firstname_middlename: string;
  mobile_no: string;
  barangay: string;
  purok: string;
  party: string;
  group: string;
  longitude: string;
  latitude: string;
  verified: boolean;
  confirmed: boolean;
  unassigned: boolean;
  vote_status: string;
}
