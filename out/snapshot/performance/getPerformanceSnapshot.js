import { performanceSnapshotReportRow } from "./types";
import { getSnapshot } from "../getSnapshot";
const reportName = "Performance Snapshot";
export async function getPerformanceSnapshot(unifier) {
    const keys = Object.keys(performanceSnapshotReportRow);
    const udr = await getSnapshot(unifier, reportName, keys);
    const snapshot = udr.map((row) => ({
        Control_Account_Manager: row.Control_Account_Manager,
        cpi_hgh_thlds_bchd: row.cpi_hgh_thlds_bchd,
        cpi_low_thlds_bchd: row.cpi_low_thlds_bchd,
        Perf_SS_P6_AC: row.Perf_SS_P6_AC,
        Perf_SS_ACWP: row.Perf_SS_ACWP,
        Perf_SS_BAC: row.Perf_SS_BAC,
        Perf_SS_CPI: row.Perf_SS_CPI,
        Perf_SS_CV: row.Perf_SS_CV,
        Perf_SS_EAC: row.Perf_SS_EAC,
        Perf_SS_ETC: row.Perf_SS_ETC,
        Perf_SS_EV: row.Perf_SS_EV,
        PM_Adjusted_ETC: row.PM_Adjusted_ETC,
        Perf_SS_PV: row.Perf_SS_PV,
        Perf_SS_SPI: row.Perf_SS_SPI,
        Perf_SS_SV: row.Perf_SS_SV,
        Perf_SS_VAC: row.Perf_SS_VAC,
        cv_hgh_thlds_bchd: row.cv_hgh_thlds_bchd,
        cv_low_thlds_bchd: row.cv_low_thlds_bchd,
        D: row.D,
        uuu_obs_fullname: row.uuu_obs_fullname,
        funding_type_p6udf: row.funding_type_p6udf,
        GROUP_NAME: row.GROUP_NAME,
        pm_vac_hgh_thlds_bchd: row.pm_vac_hgh_thlds_bchd,
        pm_vac_low_thlds_bchd: row.pm_vac_low_thlds_bchd,
        pp_Cum_P6_AC: row.pp_Cum_P6_AC,
        pp_Cum_ACWP: row.pp_Cum_ACWP,
        pp_cpi_hgh_thlds_bchd: row.pp_cpi_hgh_thlds_bchd,
        pp_cpi_low_thlds_bchd: row.pp_cpi_low_thlds_bchd,
        pp_cv_hgh_thlds_bchd: row.pp_cv_hgh_thlds_bchd,
        pp_cv_low_thlds_bchd: row.pp_cv_low_thlds_bchd,
        pp_Cum_EV: row.pp_Cum_EV,
        pp_Cum_PV: row.pp_Cum_PV,
        pp_spi_hgh_thlds_bchd: row.pp_spi_hgh_thlds_bchd,
        pp_spi_low_thlds_bchd: row.pp_spi_low_thlds_bchd,
        pp_sv_hgh_thlds_bchd: row.pp_sv_hgh_thlds_bchd,
        pp_sv_low_thlds_bchd: row.pp_sv_low_thlds_bchd,
        OBS_PUID: row.OBS_PUID,
        short_desc: row.short_desc,
        spi_hgh_thlds_bchd: row.spi_hgh_thlds_bchd,
        spi_low_thlds_bchd: row.spi_low_thlds_bchd,
        sv_hgh_thlds_bchd: row.sv_hgh_thlds_bchd,
        sv_low_thlds_bchd: row.sv_low_thlds_bchd,
        TAB_NAME: row.TAB_NAME,
        uuu_user_loginname: row.uuu_user_loginname,
        vac_hgh_thlds_bchd: row.vac_hgh_thlds_bchd,
        vac_low_thlds_bchd: row.vac_low_thlds_bchd,
        uuu_cmwbs_code: row.uuu_cmwbs_code,
        uuu_P6ETCComputeType: row.uuu_P6ETCComputeType,
        uuu_cmwbs_name: row.uuu_cmwbs_name,
        uuu_P6WBSPath: row.uuu_P6WBSPath,
        wbs_type_p6udf: row.wbs_type_p6udf,
        PROJ_ID: row.PROJ_ID
    }));
    return snapshot;
}
//# sourceMappingURL=getPerformanceSnapshot.js.map