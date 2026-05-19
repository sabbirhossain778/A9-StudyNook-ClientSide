export const allRooms = async() =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-rooms`, { cache: 'no-store' });
    const data = await res.json();
    return data || [];
}
export const featureRooms = async() =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-rooms`, { cache: 'no-store' });
    const data = await res.json();
    return data || [];
}

