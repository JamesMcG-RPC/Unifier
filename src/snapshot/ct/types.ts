export const ctSnapshotReportRow = { 
  D: "",
  Tab_Name: "",
  Group_Name: "",
  Short_Description: "",
  Year: "",
  LPC: "",
  RAC: "",
  Snapshot_Line_Item_Type: " ",
  Total_Year_Budget: "0",
  Current_Forecast_Amount: "0",
  fcast_desc_ml4000: "",
  PROJ_ID: "0"
} as const;

export type CTSnapshotReportRow = typeof ctSnapshotReportRow;
export type CTSnapshotReport = CTSnapshotReportRow[];
