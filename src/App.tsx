import { useState, useEffect } from "react";
import classNames from "classnames";
import "./App.scss";
import Image from "./components/types";
import { ListImages } from "./components/ListImages";
import { Header } from "./components/Header";
import { Pagination } from "./components/Pagination";
import { getListImages } from "./api/api";
import { Popup } from "./components/Popup";
import { Routes, Route } from "react-router-dom";

function App() {
    const [listImages, setListImages] = useState<Image[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [favorite, setFavorite] = useState(
        JSON.parse(localStorage.getItem("favoriteImg") as string) || []
    );
    const [image, setImage] = useState<Image>();
    const [isOpen, setIsOpen] = useState(false);

    const listImagesFromServer = async (page: number, limit: number) => {
        const imagesFromServer = await getListImages(page, limit);

        setListImages(imagesFromServer);
    };

    useEffect(() => {
        listImagesFromServer(page, limit);
    }, []);

    useEffect(() => {
        listImagesFromServer(page, limit);
    }, [page, limit]);

    useEffect(() => {
        localStorage.setItem("favoriteImg", JSON.stringify(favorite));
    }, [favorite]);

    const favoriteImage = (img: Image) => {
        setFavorite((state: Image[]) => {
            const id: String[] = [];

            state.forEach((item) => id.push(item.id));

            if (id.includes(img.id)) {
                return state.filter((item) => item.id !== img.id);
            } else {
                return [...state, img];
            }
        });
    };

    const limitPerPage = (limit: number) => {
        setLimit(limit);
    };

    const onPageChange = (page: number) => {
        setPage(page);
        window.scrollTo(0, 0);
    };

    const toNextPage = () => {
        setPage((state) => state + 1);
        window.scrollTo(0, 0);
    };

    const toPrevPage = () => {
        setPage((state) => state - 1);
        window.scrollTo(0, 0);
    };

    const openPopup = (img: Image) => {
        setIsOpen(true);
        setImage(img);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <Header
                            count={favorite.length}
                            limitPerPage={limitPerPage}
                        />
                    }
                >
                    <Route
                        path="/"
                        element={
                            <>
                                <div
                                    className={classNames(
                                        isOpen && "App__passive"
                                    )}
                                >
                                    <ListImages
                                        listImages={listImages}
                                        favorite={favorite}
                                        favoriteImage={favoriteImage}
                                        openPopup={openPopup}
                                    />
                                    <Pagination
                                        perPage={limit}
                                        page={page}
                                        onPageChange={onPageChange}
                                        toNextPage={toNextPage}
                                        toPrevPage={toPrevPage}
                                    />
                                </div>
                                {isOpen && (
                                    <Popup
                                        image={image}
                                        closePopup={closePopup}
                                    />
                                )}
                            </>
                        }
                    />

                    <Route
                        path="favorite"
                        element={
                            <>
                                <div
                                    className={classNames(
                                        isOpen && "App__passive"
                                    )}
                                >
                                    <ListImages
                                        listImages={favorite}
                                        favorite={favorite}
                                        favoriteImage={favoriteImage}
                                        openPopup={openPopup}
                                    />
                                </div>
                                {isOpen && (
                                    <Popup
                                        image={image}
                                        closePopup={closePopup}
                                    />
                                )}
                            </>
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
