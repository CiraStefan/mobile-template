import { formatISO, parseISO } from "date-fns";
import { RxDocument } from "rxdb";

/* eslint-disable @typescript-eslint/naming-convention */
export interface Activity {
  activityId: string;
  name: string;
  description: string;
  category: string;
  date: Date;
  time: number;
  intensity: string;
}

export interface ActivityDocument {
  activityId: string;
  name: string;
  description: string;
  category: string;
  date: string;
  time: number;
  intensity: string;
}

export interface Category {
  name: string;
}

export const mapDocumentToActivity = (activity: ActivityDocument): Activity => {
  return {
    activityId: activity.activityId,
    name: activity.name,
    description: activity.description,
    category: activity.category,
    date: parseISO(activity.date),
    time: activity.time,
    intensity: activity.intensity
  } as Activity;
}

export const mapActivityToDocument = (activity: Activity): ActivityDocument => {
  console.log(typeof(activity.date))
  return {
    activityId: activity.activityId,
    name: activity.name,
    description: activity.description,
    category: activity.category,
    date: formatISO(activity.date),
    time: activity.time,
    intensity: activity.intensity
  } as ActivityDocument;
}

export const compareActivitiesByIntensity = (activity1: Activity, activity2: Activity): number => {
  if(activity1.intensity === activity2.intensity) {
    return activity1.category.toLocaleLowerCase().localeCompare(activity2.category.toLocaleLowerCase())
  }
  const intensity1Value = activity1.intensity === 'easy' ? 1 : (activity1.intensity === 'medium' ? 2 : 3);
  const intensity2Value = activity2.intensity === 'easy' ? 1 : (activity2.intensity === 'medium' ? 2 : 3);
  if (intensity1Value > intensity2Value) {
    return 1;
  }
  else {
    return -1;
  }
}

