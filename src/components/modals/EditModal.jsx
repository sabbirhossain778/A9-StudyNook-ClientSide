"use client";
import { toast } from "react-toastify";
import { Button, FieldError, Input, Label, Modal, Surface, TextArea, TextField } from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";

export function EditModal({ room }) {

    const router = useRouter();

    const { _id, roomName, image, description, floor, capacity, hourlyRate } = room;

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedRoomData = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-rooms/${_id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(updatedRoomData),
            });

            if (res.ok) {
                toast.success("Room updated successfully");
                router.refresh();
            } else {
                toast.error("Failed to update room");
            }
        } catch (error) {
            console.error("Error updating room:", error);
            toast.error("Something went wrong :", error);
        }
    };

    return (
        <Modal>
            {/* 📝 এডিট ট্রিগার বাটন */}
            <Button variant="secondary">
                📝 Edit Listing
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-xl bg-[#121212] text-white rounded-3xl border border-white/5">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="text-2xl font-serif text-white tracking-tight pl-4 pt-4">Edit Workspace Listing</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-2">
                            <Surface variant="default" className="bg-transparent">
                                <form onSubmit={onSubmit} className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                        {/* Room Name */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={roomName} name="roomName" isRequired className="w-full">
                                                <Label className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">Workspace Name</Label>
                                                <Input placeholder="Premium Executive Space" className="rounded-xl bg-white/5 border border-white/10 text-white" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Floor */}
                                        <TextField defaultValue={floor} name="floor" isRequired className="w-full">
                                            <Label className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">Floor</Label>
                                            <Input placeholder="G Floor" className="rounded-xl bg-white/5 border border-white/10 text-white" />
                                            <FieldError />
                                        </TextField>

                                        {/* Capacity */}
                                        <TextField defaultValue={capacity} name="capacity" isRequired className="w-full">
                                            <Label className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">Capacity</Label>
                                            <Input placeholder="20 People" className="rounded-xl bg-white/5 border border-white/10 text-white" />
                                            <FieldError />
                                        </TextField>

                                        {/* Hourly Rate */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={hourlyRate} name="hourlyRate" type="number" isRequired className="w-full">
                                                <Label className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">Hourly Rate ($ USD)</Label>
                                                <Input type="number" placeholder="50" className="rounded-xl bg-white/5 border border-white/10 text-white" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Image URL */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={image} name="image" isRequired className="w-full">
                                                <Label className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">Image URL</Label>
                                                <Input type="url" placeholder="https://unsplash.com/..." className="rounded-xl bg-white/5 border border-white/10 text-white" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={description} name="description" isRequired className="w-full">
                                                <Label className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">Description</Label>
                                                <TextArea placeholder="Describe the workspace..." className="rounded-xl bg-white/5 border border-white/10 text-white min-h-[100px]" />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>

                                    <Modal.Footer className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                                        <Button slot="close" variant="plain" className="text-slate-400 hover:bg-white/5 rounded-xl h-11 px-4 text-sm font-medium">
                                            Cancel
                                        </Button>
                                        <Button type="submit" slot="close" className="bg-[#ff6b35] hover:bg-white text-black font-bold rounded-xl h-11 px-6 text-sm shadow-sm transition duration-200">
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}