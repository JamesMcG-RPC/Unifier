export type P2PSnapshotLineItem = {
    last_snapshot_taken: string;
    Snapshot_Line_Item_Type: string;
    curr_fcst_proj_curr: string | number;
    uuu_tab_id: string;
    fcast_desc_ml4000: string;
    Parent_CBS_Name: string;
    prv_fcst_proj_curr: string | number;
    Year: string;
    bItemID: string | number;
    short_desc: string;
    Parent_CBS: string;
}
export type P2PSnapshot = P2PSnapshotLineItem[]