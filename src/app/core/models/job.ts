export interface Job {
    id: string;
    url: string;
    title: string;
    content_text: string;
    date_modified: string;
    _feed_entry: {
        uuid: string;
        status: string;
        title: string;
        businessName: string;
        municipal: string;
    };
}

export interface JobFeed {
    items: Job[];
    next_url?: string;
}