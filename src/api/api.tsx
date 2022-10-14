const BASE_URL = "https://picsum.photos/v2/list";

const request = (url: string) => {
    return fetch(`${BASE_URL}${url}`).then((response) => {
        if (!response.ok) {
            throw `${response.status} - ${response.statusText}`;
        }

        return response.json();
    });
};

export const getListImages = (page: number, limit: number) =>
    request(`?page=${page}&limit=${limit}`);
