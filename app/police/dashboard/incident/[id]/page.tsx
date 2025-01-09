import { supabase } from "@/lib/supabase";
import { IncidentDetails } from "@/components/IncidentDetails";
import { notFound } from "next/navigation";

interface IncidentPageProps {
    params: {
        id: string;
    };
}

export default async function PostPage({ params }: IncidentPageProps) {
    const incidentID = params.id;
    const { data, error } = await supabase
        .from("incidents")
        .select("*")
        .eq("id", incidentID);
    if (error || data.length === 0) {
        return notFound();
    }
    console.log(data);
    return <IncidentDetails incident={data[0]} />;
}
