export type Photo = {
  src: string;
  thumbnail: string;
  alt: string;
};

export type TimeSlot = {
  start_hour: number;
  end_hour: number;
  label: string;
};

export type DaySchedule = {
  date: string;
  label: string;
  timeSlots: TimeSlot[];
};

export type Manifest = {
  days: {
    [day: string]: {
      [photographer: string]: string[]; // array of time slot names (e.g. "07-09", "09-11")
    };
  };
  schedule: {
    [day: string]: DaySchedule;
  };
};
