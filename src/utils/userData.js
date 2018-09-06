export function setUserData(params) {
    return localStorage.setItem('user-data',  JSON.stringify(params));
}

export function getUserData(params) {
    var data = localStorage.getItem('user-data');
    if (data === null) {
        return null;
    }
    try {
        return JSON.parse(data);
    } catch (error) {
        setUserData(null);
    }

    return null;
}