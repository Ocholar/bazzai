import React from "react";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ErrorMessageProps {
    error: any;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
    return (
        <Card className="p-6 border-red-200 bg-red-50">
            <div className="flex items-center gap-3 text-red-800">
                <AlertCircle size={24} />
                <div>
                    <h3 className="font-bold">Error Loading Data</h3>
                    <p className="text-sm opacity-90">
                        {error?.message || "An unexpected error occurred. Please try again later."}
                    </p>
                </div>
            </div>
        </Card>
    );
}
