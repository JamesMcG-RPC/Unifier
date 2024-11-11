import { AxiosInstance } from "axios";
import { p2pSnapshotReportRow } from "./types.js";
import { getSnapshot } from "../getSnapshot.js";

const reportName = "Yearly Forecast Snapshot";

export async function getP2PSnapshot(unifier: AxiosInstance, shell_number?: string, PROJ_ID = "") {
  const keys = Object.keys(p2pSnapshotReportRow);
  const udr = await getSnapshot(unifier, reportName, keys, "", [{ label: "PROJ_ID", value1: PROJ_ID }]);

  const snapshot = udr.map((row) => ({
    last_snapshot_taken: row.Last_Snapshot_Taken,
    Snapshot_Line_Item_Type: row.Snapshot_Line_Item_Type,
    curr_fcst_proj_curr: row.Current_Forecast_Amount,
    uuu_tab_id: row.Tab_Name,
    fcast_desc_ml4000: row.fcast_desc_ml4000,
    Parent_CBS_Name: row.Parent_CBS_Name,
    prv_fcst_proj_curr: row.Previous_Forecast_Amount,
    Year: row.Year,
    bItemID: row.CBS,
    short_desc: row.Short_Description,
    Parent_CBS: row.Parent_CBS
  }));

  return snapshot;
}
