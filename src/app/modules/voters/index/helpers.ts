import { VoterInterface } from "../../../interface";

export function getVoterFullname(voter: VoterInterface) {

  if (voter.firstname && voter.middlename && voter.lastname) {
    return `${voter.firstname} ${voter.middlename} ${voter.lastname}`;
  }

  if (voter.firstname && !voter.middlename && voter.lastname) {
    return `${voter.firstname} ${voter.lastname}`;
  }

  return voter.firstname;

}
