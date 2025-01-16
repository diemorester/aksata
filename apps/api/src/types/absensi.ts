export interface AbsensiQuery {
  page?: number;
  take?: number;
  search?: string;
  filterBy?: 'daily' | 'weekly' | 'monthly' | 'yearly'
}