"use client";
import { useState } from "react";
import { Button, Modal, Input, TextArea } from "@heroui/react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

const TIME_SLOTS = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 8;
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
});

export function BookingModal({ room, userEmail }) {
    const { _id, roomName, hourlyRate } = room;

    const { data: session } = useSession(); 
    const token = session?.token;

    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    // const [totalCost, setTotalCost] = useState(0);

    const today = new Date().toISOString().split("T")[0];

    let totalCost = 0;
    if (startTime && endTime) {
        const startHour = parseInt(startTime.split(":")[0]);
        const endHour = parseInt(endTime.split(":")[0]);

        if (endHour > startHour) {
            totalCost = (endHour - startHour) * Number(hourlyRate);
        }
        }

    const filteredEndTimeSlots = TIME_SLOTS.filter((time) => {
        if (!startTime) return true;
        return parseInt(time.split(":")[0]) > parseInt(startTime.split(":")[0]);
    });

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (!date || !startTime || !endTime) {
            return toast.error("Please fill all required fields");
        }

        const specialNote = e.target.specialNote?.value || "";

        const bookingPayload = {
            roomId: _id, roomName, userEmail, date, startTime, endTime, totalCost, specialNote
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings`, {
            method: "POST",
            headers: { "content-type": "application/json",
              authorization: `Bearer ${token}`  
             },
            body: JSON.stringify(bookingPayload),
        });
        const data = await res.json();

        if (res.ok && (data.success || data.insertedId)) {
            toast.success("Room booked successfully!");
            setStartTime("");
            setEndTime("");
            setDate("");
        } else {
            toast.error(data.error || "Booking failed");
        }
    };

    return (
        <Modal>
            {/* btn */}
            <Button className="w-full sm:w-auto bg-[#ff6b35] hover:bg-white text-black font-bold px-6 py-3 rounded-lg transition duration-200">
                Book This Space
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-md bg-[#121212] text-white rounded-2xl p-4 border border-white/5">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="text-xl font-bold font-serif text-white">Book: {roomName}</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body>
                            <form onSubmit={handleBookingSubmit} className="space-y-4 mt-2">

                                {/* date */}
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400">Select Date</label>
                                    <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} required className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#ff6b35]" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* time start*/}
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400">Start Time</label>
                                        <select value={startTime} onChange={(e) => { setStartTime(e.target.value); setEndTime(""); }} required className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#ff6b35] [&>option]:bg-[#121212]">
                                            <option value="">Select</option>
                                            {TIME_SLOTS.map((time) => <option key={time} value={time}>{time}</option>)}
                                        </select>
                                    </div>

                                    {/* end time */}
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400">End Time</label>
                                        <select value={endTime} onChange={(e) => setEndTime(e.target.value)} disabled={!startTime} required className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#ff6b35] disabled:opacity-50 [&>option]:bg-[#121212]">
                                            <option value="">Select</option>
                                            {filteredEndTimeSlots.map((time) => <option key={time} value={time}>{time}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* total cost */}
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                                    <span className="text-sm text-slate-400">Calculated Total:</span>
                                    <span className="text-xl font-bold text-[#ff6b35]">${totalCost}</span>
                                </div>

                                {/* note */}
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-400">Special Note (Optional)</label>
                                    <TextArea name="specialNote" placeholder="Enter any specific requests or instructions..." className="mt-1 bg-white/5 border border-white/10 text-white" />
                                </div>

                                {/* btn */}
                                <Modal.Footer className="p-0 pt-2 flex gap-3">
                                    <Button slot="close" variant="plain" className="w-1/2 text-slate-400 hover:bg-white/5 rounded-xl h-11">
                                        Cancel
                                    </Button>
                                    <Button type="submit" slot={totalCost > 0 ? "close" : ""} className="w-1/2 bg-[#ff6b35] hover:bg-white text-black font-bold rounded-xl h-11 transition duration-200">
                                        Confirm Booking
                                    </Button>
                                </Modal.Footer>

                            </form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}

