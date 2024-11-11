export type EventFilter = {
    event_date?: Date;
    object_name?: string;
    object_type?: string;
    old_status?: string;
    new_status?: string;
    record_no?: string;
    project_id?: string;
    shell_number?: string;
};
export interface EventData {
    latest_event_date: Date;
    items: EventNotification[];
    total_records: number;
    fetched_records: number;
}
export interface EventNotification {
    workflow_from: string;
    old_status: string | null;
    workflow_action: string;
    workflow_to: string;
    object_type: string;
    new_status: string;
    shell_number: string;
    object_prefix: string;
    project_id: number;
    object_name: string;
    record_no: string;
    event_date: Date | string;
    object_subtype: string;
};