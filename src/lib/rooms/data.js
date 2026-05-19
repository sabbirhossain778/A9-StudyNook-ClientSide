export const allRooms = async() =>{
    const res = await fetch('http://localhost:8000/all-rooms', { cache: 'no-store' });
    const data = await res.json();
    return data || [];
}
export const featureRooms = async() =>{
    const res = await fetch('http://localhost:8000/featured-rooms', { cache: 'no-store' });
    const data = await res.json();
    return data || [];
}