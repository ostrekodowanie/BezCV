export interface PackageProps {
    points: number;
    price: number;
    days: 30 | 90;
}
  
export const packages: PackageProps[] = [
{
    days: 30,
    points: 10,
    price: 499,
},
{
    days: 30,
    points: 15,
    price: 699,
},
{
    days: 30,
    points: 20,
    price: 899,
},
{
    days: 90,
    points: 30,
    price: 1617,
},
{
    days: 90,
    points: 45,
    price: 2157,
},
{
    days: 90,
    points: 60,
    price: 2427,
},
];

type BuyerInfoType = {
    full_name: string,
    email: string,
    phone: string,
    nip: string,
}

type InvoiceInfoType = {
    address: string,
    postal_code: string,
    city: string
}

export type PaymentDataType = BuyerInfoType & InvoiceInfoType

export const initialPaymentData: InvoiceInfoType = {
    postal_code: '',
    address: '',
    city: ''
}