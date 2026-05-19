import Link from "next/link";
import { Button } from "@heroui/react";
import { SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="text-center max-w-md space-y-6">

                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                        <SearchX className="w-10 h-10 text-blue-600" />
                    </div>
                </div>

                <h1 className="text-4xl font-black text-slate-900">
                    404
                </h1>

                <h2 className="text-xl font-bold text-slate-700">
                    Page not found
                </h2>

                <p className="text-slate-500">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>

                <div className="flex gap-3 justify-center pt-2">
                    <Link href="/">
                        <Button href="/" color="primary">
                            Go Home
                        </Button>
                    </Link>

                    <Link href="/all-rooms">
                        <Button variant="flat">
                            Browse Rooms
                        </Button>
                    </Link>

                </div>
            </div>
        </div>
    );
}