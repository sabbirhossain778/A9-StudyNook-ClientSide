"use client";
import { Button, Modal } from "@heroui/react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

export function CancelModal({ bookingId, userEmail, onCancelSuccess }) {

    const { data: session } = useSession(); 
        const token = session?.token;

    const handleCancel = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}/cancel?email=${userEmail}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        if (res.ok) {
            toast.success("Booking cancelled successfully");
            if (onCancelSuccess) onCancelSuccess();
        } else {
            toast.error("Failed to cancel booking");
        }
    };

    return (
        <Modal>
            <Button className="bg-rose-950 text-rose-400 hover:bg-rose-600 hover:text-white text-xs px-4 py-2 rounded-xl transition">
                Cancel Booking
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-md bg-[#121212] text-white rounded-2xl p-4 border border-white/5">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="text-lg font-bold">Cancel This Booking?</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-slate-400 text-sm">
                                Are you sure you want to cancel this room workspace booking? This action cannot be undone.
                            </p>
                        </Modal.Body>
                        <Modal.Footer className="flex justify-end gap-3 pt-4">
                            <Button slot="close" variant="plain" className="text-slate-400 hover:bg-white/5 rounded-xl text-sm">
                                No, Keep It
                            </Button>
                            <Button onClick={handleCancel} slot="close" className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-medium">
                                Yes, Cancel Booking
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}