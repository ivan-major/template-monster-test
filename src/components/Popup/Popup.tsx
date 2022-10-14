import React from "react";
import Image from "../types";
import "./Popup.scss";

type Props = {
    image: Image | undefined;
    closePopup: Function;
};

export const Popup: React.FC<Props> = ({ image, closePopup }) => {
    return (
        <>
            {image && (
                <div className="popup">
                    <div className="popup__close" onClick={() => closePopup()}>
                        Close
                    </div>

                    <div className="popup__block">
                        <div className="popup__author">{image.author}</div>
                        <div className="popup__img">
                            <img src={image.download_url} alt="image" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
