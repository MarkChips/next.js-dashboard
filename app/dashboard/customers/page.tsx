import Table from '@/app/ui/customers/table';
import { Metadata } from 'next';
import { fetchCustomers, fetchFilteredCustomers } from '@/app/lib/data';

export const metadata: Metadata = {
    title: 'Customers',
};

export default async function Page() {
    const customerNames = (await fetchCustomers()).map(obj => obj.name);
    const customers = (await Promise.all(
        customerNames.map(
            name => fetchFilteredCustomers(name)
        )
    )).flat();

    return (
        <>
            <Table customers={customers} />
        </>
    );
}