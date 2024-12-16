'use client'
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAbsensi } from "@/libs/fetch/absensi";
import { UseAbsensiParams } from "@/types/absensiTypes";
import { useMemo } from "react";

export const useAbsensi = ({ userId, page, limit, search }: UseAbsensiParams) => {
    const queryKey = useMemo(
        () => ["absensi", userId, page, limit, search],
        [userId, page, limit, search]
    );

    const queryFn = async () => fetchAbsensi(userId, page, limit, search);

    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn,
        // keepPreviousData: true
    });

    return {
        absensi: data?.absensi || [],
        hasNextPage: data?.hasNextPage ?? false,
        hasPreviousPage: data?.hasPrevPage ?? false,
        isLoading,
        error,
    };
};