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

export function getVoterStatus(voter: VoterInterface) {
  switch (voter.vote_status.toUpperCase()) {
    case 'ACTIVE':
      return 'success'
    default:
      return 'warning'
  }
}
