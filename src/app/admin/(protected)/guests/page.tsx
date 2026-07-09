import { getAllGuests } from "@/lib/data/guests";
import { AddGuestForm } from "@/components/admin/AddGuestForm";
import { BulkAddForm } from "@/components/admin/BulkAddForm";
import { GuestTable } from "@/components/admin/GuestTable";

export default async function AdminGuestsPage() {
  const guests = await getAllGuests();

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-serif text-2xl text-rose-dark">Guests</h1>

      <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-charcoal/80">Add a Guest</h2>
        <div className="mt-3">
          <AddGuestForm />
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-charcoal/80">Bulk Add Guests</h2>
        <div className="mt-3">
          <BulkAddForm />
        </div>
      </div>

      <div className="mt-6">
        <GuestTable guests={guests} />
      </div>
    </div>
  );
}
