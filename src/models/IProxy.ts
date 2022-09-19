export default interface IProxy {
  id: number;
  type: string;
  ip: string;
  number: number;
  storage: number;
  max_storage: number;
  max_conversions?: number;
  max_publications?: number;
  created_at: string;
  updated_at: string;
  upload_bandwidth?: unknown;
  upload_bandwidth_limit?: unknown;
}