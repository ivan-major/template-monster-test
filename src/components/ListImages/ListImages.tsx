import React, { useEffect, useState } from "react";
import classNames, { Argument } from "classnames";
import Image from "../types";
import "./ListImages.scss";

type Props = {
    listImages: Image[];
    favorite: Image[];
    favoriteImage: Function;
    openPopup: Function;
};

export const ListImages: React.FC<Props> = ({
    listImages,
    favorite,
    favoriteImage,
    openPopup,
}) => {
    const [id, setId] = useState<String[]>([]);

    useEffect(() => {
        const idFavorite: String[] = [];

        favorite.forEach((item) => idFavorite.push(item.id));

        setId(idFavorite);
    }, [favorite]);

    return (
        <div className="images">
            <ul className="images__list">
                {listImages.map((image) => (
                    <li key={image.id} className="image">
                        <div
                            className="image__pict"
                            onClick={() => openPopup(image)}
                        >
                            <img src={image.download_url} alt="image1" />
                        </div>
                        <div className="image__block">
                            <div className="image__author">{image.author}</div>
                            <div
                                className={classNames(
                                    "image__icon",
                                    id.includes(image.id) &&
                                        "image__icon_choosed"
                                )}
                                onClick={() => {
                                    favoriteImage(image);
                                }}
                            >
                                <svg
                                    id="icon-heart"
                                    viewBox="0 0 32 32"
                                    fill="#fff"
                                    stroke="#020727"
                                >
                                    <path d="M23.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z"></path>
                                </svg>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
