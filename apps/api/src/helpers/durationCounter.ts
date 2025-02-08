// export const durationCounter = (clockIn: Date | null, clockOut: Date | null) => {
//     if (!clockIn || !clockOut) return null;

//     const diffMs = Math.abs(new Date(clockOut).getTime() - new Date(clockIn).getTime());
//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

//     return `${diffHours}:${diffMinutes}`;
// }

export const durationCounter = (clockIn: Date | null, clockOut: Date | null) => {
    if (!clockIn || !clockOut) return null;

    const diffMs = Math.abs(new Date(clockOut).getTime() - new Date(clockIn).getTime());
    let diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

    // Kurangi 1 jam untuk istirahat
    diffHours = Math.max(0, diffHours - 1);

    return `${diffHours}:${diffMinutes}`;
};