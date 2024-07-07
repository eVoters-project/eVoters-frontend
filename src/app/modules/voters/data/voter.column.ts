import { VoterInterface } from "../../../interface";
import { TableColumnInterface } from "../../../shared/interface";

type voterKeys = keyof VoterInterface;

export const VoterColumns: TableColumnInterface[] = [
  {
    header: 'Precinct No.',
    field: nameOf<VoterInterface>((obj) => obj.precinct_no)
  },
  {
    header: 'Last Name',
    field: nameOf<VoterInterface>((obj) => obj.lastname)
  },
  {
    header: 'First Name',
    field: nameOf<VoterInterface>((obj) => obj.firstname)
  },
  {
    header: 'Middle Name',
    field: nameOf<VoterInterface>((obj) => obj.middlename)
  },
  {
    header: '',
    field: nameOf<VoterInterface>((obj) => obj.id)
  },
]


export default function nameOf<T extends object>(nameExtractor: (obj: T) => any): keyof T {
  const proxy = new Proxy({} as T, {
    get(target, prop: string | symbol) {
      return prop;
    },
  });

  return nameExtractor(proxy);
}
