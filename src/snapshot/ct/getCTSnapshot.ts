import { AxiosInstance } from "axios";
import { ctSnapshotReportRow } from "./types.js";
import { getSnapshot } from "../getSnapshot.js";

const reportName = "CT Snapshot";

export async function getCTSnapshot(unifier: AxiosInstance, shell_number?: string, PROJ_ID = "") {
  const keys = Object.keys(ctSnapshotReportRow);
  const udr = await getSnapshot(unifier, reportName, keys, "", [{ label: "PROJ_ID", value1: PROJ_ID }]);

  const snapshot = udr.map((row) => ({
    Year: row.Year,
    Snapshot_Line_Item_Type: row.Snapshot_Line_Item_Type,
    cur_bud_total: row.Total_Year_Budget,
    curr_fcst_proj_curr: row.Current_Forecast_Amount,
    RAC: row.RAC,
    uuu_tab_id: row.Tab_Name,
    short_desc: row.Short_Description,
    fcast_desc_ml4000: row.fcast_desc_ml4000,
    LPC: row.LPC
  }));

  return snapshot;
}