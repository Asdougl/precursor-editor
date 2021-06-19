export interface Workspace {
    _id: string;
    owner: string;
    title: string;
}

export interface Timeline {
    _id: string;
    start: number;
    end: number;
    resolution: number;
    name?: string;
}

export interface TimelineEvent {
    _id: string;
    year: number;
    name: string;
    tags?: string[];
}

export const timelineEventSorter = (a: TimelineEvent, b: TimelineEvent): 1 | 0 | -1 => {
    if(a.year > b.year) return 1
    if(a.year < b.year) return -1
    return 0;
}