import { formatISO, parseISO } from "date-fns";
import { Activity } from "src/app/domain/model/activity";

export interface ActivityDto {
  id: number;
  name: string;
  description: string;
  category: string;
  date: string;
  time: number;
  intensity: string;
}

export interface IntensityBodyDto {
  id: number;
  intensity: string;
}

export const mapDtoToModel = (activity: ActivityDto): Activity => {
  return {
    activityId: activity.id.toString(),
    name: activity.name,
    description: activity.description,
    category: activity.category,
    date: parseISO(activity.date),
    time: activity.time,
    intensity: activity.intensity
  } as Activity;
}

export const mapModelToDto = (activity: Activity): ActivityDto => {
  return {
    id: +activity.activityId,
    name: activity.name,
    description: activity.description,
    category: activity.category,
    date: formatISO(activity.date),
    time: activity.time,
    intensity: activity.intensity
  } as ActivityDto;
}
