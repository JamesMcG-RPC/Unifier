export const p2pSnapshotReportRow = {
  D: "",
  Tab_Name: "",
  Group_Name: "",
  Short_Description: "",
  Last_Snapshot_Taken: "",
  Year: "",
  Parent_CBS: "",
  Parent_CBS_Name: "",
  CBS: "",
  Snapshot_Line_Item_Type: "",
  Previous_Forecast_Amount: "",
  Current_Forecast_Amount: "",
  PROJ_ID: "",
  SNAPSHOT_ID: "",
  RECORD_NO: "",
  fcast_desc_ml4000: ""
} as const;

export type P2PSnapshotReportRow = typeof p2pSnapshotReportRow;
export type P2PSnapshotReport = P2PSnapshotReportRow[];
