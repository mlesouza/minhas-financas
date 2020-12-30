interface IInvoice {
  amount: number;
  date: string;
  description: string;
  frequency: string;
  id?: number;
  type: string;
}
export default IInvoice;
