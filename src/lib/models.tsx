export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  detail: string;
  short: string;
  category: string;
  is_published: boolean;
}
export interface Menu {
  id: number;
  name: string;
  price: number;
}
export interface Order {
  id: number;
  order_id: number;
  quantity: number;
  note: string;
  total_price: number;
}
