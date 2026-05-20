"use client";
import { toast } from "react-toastify";
import { Button, Modal } from "@heroui/react";
import { BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";

export function DeleteModal({ roomId, onDeleteSuccess }) {

    const router = useRouter();
    const handleDelete = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-rooms/${roomId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Room deleted successfully");

                if (onDeleteSuccess) onDeleteSuccess();
                router.push("/my-listings");
                router.refresh();
            }
            else {
                toast.error("Failed to delete room");
            }
        } catch (error) {
            console.error("Error deleting destination:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Modal>
            <Button variant="danger">
                <BiTrash className="text-base" /> Delete Listing
            </Button>
            {/* <button id="delete-btn">Delete Listing</button> */}
            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-md bg-white text-slate-800 rounded-2xl p-2">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="text-xl font-bold text-slate-900">Are you absolutely sure?</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body>
                            <p className="text-slate-500 text-sm">
                                This action cannot be undone. This will permanently delete the workspace listing from the database network.
                            </p>
                        </Modal.Body>

                        <Modal.Footer className="flex items-center justify-end gap-3 pt-4">
                            <Button slot="close" variant="plain" className="text-slate-500 hover:bg-slate-100 rounded-xl h-10 px-4 text-sm font-medium">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} slot="close" className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl h-10 px-4 text-sm font-medium shadow-sm">
                                Confirm Delete
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
