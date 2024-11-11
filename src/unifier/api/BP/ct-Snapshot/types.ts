export type CTSnapshotLineItem = {

    Year: string;
    Snapshot_Line_Item_Type: string;
    cur_bud_total: string | number;
    curr_fcst_proj_curr: string | number;
    RAC: string;
    uuu_tab_id: string;
    short_desc: string;
    fcast_desc_ml4000: string;
    LPC: string;
}
export type CTSnapshot = CTSnapshotLineItem[]