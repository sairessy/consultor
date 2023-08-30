export const check_auth = () => {
    const id = localStorage.getItem('id');
    return id != null;
}