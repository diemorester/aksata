import prisma from "@/prisma";
import { Pengajuan } from "@prisma/client";

// Enum untuk tipe pengajuan
enum OpsiLembur {
    LemburSatu = "LemburSatu",
    LemburDua = "LemburDua",
    LemburTiga = "LemburTiga",
    PerjalananDinas = "PerjalananDinas",
}

export const pengajuanLemburPerdinService = async (body: Pengajuan, userId: string) => {
    try {
        const { date, keterangan, tipePengajuan } = body;

        // Cek semua pengajuan pada tanggal yang sama untuk user tersebut
        const checkPengajuan = await prisma.pengajuan.findMany({
            where: {
                userId,
                date,
            },
        });

        // Cek apakah sudah ada pengajuan lembur atau perjalanan dinas
        const hasLembur = checkPengajuan.some((p) => 
            [OpsiLembur.LemburSatu, OpsiLembur.LemburDua, OpsiLembur.LemburTiga].includes(p.tipePengajuan as OpsiLembur)
        );
        const hasPerdin = checkPengajuan.some((p) => p.tipePengajuan === OpsiLembur.PerjalananDinas);

        // Logika validasi pengajuan
        if (checkPengajuan.length > 0) {
            if ([OpsiLembur.LemburSatu, OpsiLembur.LemburDua, OpsiLembur.LemburTiga].includes(tipePengajuan as OpsiLembur)) {
                if (hasLembur) {
                    throw new Error("Hanya boleh satu tipe lembur per hari.");
                }
                if (hasLembur && hasPerdin) {
                    throw new Error("Tidak boleh lebih dari dua pengajuan (1 lembur + 1 perjalanan dinas) per hari.");
                }
            }

            if (tipePengajuan === OpsiLembur.PerjalananDinas) {
                if (hasPerdin) {
                    throw new Error("Hanya boleh satu perjalanan dinas per hari.");
                }
                if (hasLembur && hasPerdin) {
                    throw new Error("Tidak boleh lebih dari dua pengajuan (1 lembur + 1 perjalanan dinas) per hari.");
                }
            }
        }

        // Buat pengajuan baru jika valid
        const pengajuan = await prisma.pengajuan.create({
            data: {
                userId,
                date,
                keterangan,
                tipePengajuan,
            },
        });

        return pengajuan;
    } catch (error) {
        throw error;
    }
};