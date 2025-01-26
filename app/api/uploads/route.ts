import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

const prisma = new PrismaClient();

export async function GET() {
    // Dapatkan user yang sedang login
    const currentUser = await getCurrentUser();

    // Jika user tidak ditemukan, kirimkan error
    if (!currentUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Ambil semua listing berdasarkan userId dan hanya ambil kolom imageSrc
        const images = await prisma.listing.findMany({
            where: {
                userId: currentUser.id, // Menampilkan hanya foto milik user yang login
            },
            select: {
                imageSrc: true, // Hanya mengambil field imageSrc
            },
        });

        // Kembalikan data berupa array dari imageSrc
        return NextResponse.json(images);
    } catch (error) {
        console.error("Error fetching images:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
