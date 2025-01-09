import { supabase } from "@/app/lib/client";

export async function GET() {
    try {
        const { data, error } = await supabase.from("incidents").select("*");

        if (error) throw error;
        return Response.json(data);
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "An unknown error occurred";
        return Response.json({ error: errorMessage }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { longitude, latitude, reported_at, reported_by, incident_type } =
            await request.json();
        const { data, error } = await supabase.from("incidents").insert([
            {
                longitude,
                latitude,
                reported_at,
                reported_by,
                incident_type,
            },
        ]);
        if (error) throw error;
        return Response.json({
            message: "Incident reported successfully",
            data,
        });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, longitude, latitude, reported_by } = await request.json();
        const { data, error } = await supabase
            .from("incidents")
            .update({ longitude, latitude, reported_by })
            .eq("id", id);

        if (error) throw error;
        return Response.json({
            message: "Incident updated successfully",
            data,
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "An unknown error occurred";
        return Response.json({ error: errorMessage }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const { data, error } = await supabase
            .from("incidents")
            .delete()
            .eq("id", id);

        if (error) throw error;
        return Response.json({
            message: "Incident deleted successfully",
            data,
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "An unknown error occurred";
        return Response.json({ error: errorMessage }, { status: 500 });
    }
}
