export interface FeltReportResponse {
  // server looks for ciim_address, but client sends ciim_mapAddress
  // ciim_address?: string;
  ciim_mapLat: string; // ... or number, need to see how these come out
  ciim_mapLon: string; // ... ^^ ditto ^^
  ciim_time: string;
  eventid: string; // 'null' for unknowns, but still a string version
  fldContact_email?: string;
  fldContact_name?: string;
  fldContact_phone?: string;
  form_version: string;
  // currently never sent by server, but possible ...
  // nresp?: string;
  your_cdi: string;
}
