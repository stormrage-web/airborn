export interface DateRange {
  left: string;
  right: string;
}

export interface TabParams {
  date?: string;
  start_date?: string;
  class?: string;
  dateRange?: DateRange;
  type?: 0 | 1;
  profiles?: boolean[];
  prediction_depth?: number;
}

export interface Coordinates {
  x: string;
  y: number;
}

export interface TabThreeItem {
  title: string;
  data: Coordinates[];
}

export interface Seasons {
  name: string;
  left: string;
  right: string;
}

export interface TabOneData {
  data: Coordinates[];
  seasons: Seasons[];
}

export interface TabFourData {
  dates: string[];
  predictions: number[];
}

export interface FlightState {
  flight: string;
  tabParams: TabParams;
  tabInfo: Coordinates[] | TabOneData | TabThreeItem[] | TabFourData;
  isLoading: boolean;
}