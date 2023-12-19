export const createArrByLimit = (limit: number): number[] => {
    return Array.from({length: limit}, (_,i) => ++i);
};