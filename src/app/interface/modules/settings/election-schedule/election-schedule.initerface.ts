import { ElectionSchedulePositionInterface } from "../election-schedule-positions/election-schedule-position.interface";

export interface ElectionScheduleInterface {
  id?: string | null;
  date?: Date | string | null;
  type?: string | null;
  remarks?: string | null;
  status?: string | null;
}
