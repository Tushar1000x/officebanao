import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import styles from './Edit.module.css';
import Buttons from '../../assets/Button (1).png';
import rotate from '../../assets/rotate.png';
import flipV from '../../assets/flipH.png';
import flipH from '../../assets/flipV.png';
import exchange from '../../assets/exchange.png';
import crop from '../../assets/crop.png';
import edit from '../../assets/edit.png';

function EditPopUp({ open, setOpen, img ,setimgCount}) {
    const [transform, setTransform] = useState('');
    const [transformations, setTransformations] = useState([]);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [imgInfo, setImgInfo] = useState(JSON.parse(localStorage.getItem('uploadedImg')) || []);

    const handleTransform = (type) => {
        setTransform(type);
        let newTransformations = [...transformations];
        switch (type) {
            case 'rotate':
                newTransformations.push('rotate(90deg)');
                break;
            case 'horizontalflip':
                newTransformations.push('scaleX(-1)');
                break;
            case 'verticalflip':
                newTransformations.push('scaleY(-1)');
                break;
            default:
                newTransformations = [];
                break;
        }
        setTransformations(newTransformations);
    };

    const getTransformStyle = () => {
        return transformations.join(' ');
    };
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const handleSubmit = () => {
        const nameExists = imgInfo.some(asset => asset.name === name);
        if (nameExists) {
            alert("Image with the same name already exists.");
        } else {
            let transformedImg=img;
            switch (transform) {
                case 'rotate':
                    transformedImg = applyRotation(img);
                    break;
                case 'horizontalflip':
                    transformedImg = applyHorizontalFlip(img);
                    break;
                case 'verticalflip':
                    transformedImg = applyVerticalFlip(img);
                    break;
                default:
                    transformedImg = img; // Default to original image
                    break;
            }
            
            const newAsset = {
                image: transformedImg,
                name: name,
                date: new Date().toLocaleDateString(),
                description: desc
            };
            const updatedImgInfo = [...imgInfo, newAsset];
            setImgInfo(updatedImgInfo);
            localStorage.setItem('uploadedImg', JSON.stringify(updatedImgInfo));
            setimgCount(1);
            console.log(JSON.parse(localStorage.getItem('uploadedImg')));
        }
    };
    const applyHorizontalFlip = (image) => {
        const img = new Image();
        img.src = image;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Flip horizontally
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        
        ctx.drawImage(img, 0, 0);
        
        return canvas.toDataURL();
    };
    
    const applyVerticalFlip = (image) => {
        const img = new Image();
        img.src = image;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Flip vertically
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
        
        ctx.drawImage(img, 0, 0);
        
        return canvas.toDataURL();
    };
    
    const applyRotation = (image) => {
        const img = new Image();
        img.src = image;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Ensure canvas size matches the image size
        canvas.width = img.height; // Swap width and height for rotation
        canvas.height = img.width;
        
        // Rotate 90 degrees clockwise
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(Math.PI / 2);
        
        // Draw the rotated image
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        
        // Return the rotated image as a data URL
        return canvas.toDataURL();
    };

    
    return (
        <div className={styles.modal}>
            <div className={styles.top}>
                <h1>Add Assets</h1>
                <button onClick={() => setOpen(false)}>
                    &times;
                </button>
            </div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    <div className={styles.imgcover}>
                        <img className={styles.uploadimg} style={{ transform: getTransformStyle() }} src={img} alt="image" />
                    </div>
                    <div className={styles.dropdown}>
                        <div className={styles.dropdowntoggle} onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <img src={edit} alt="" />
                        
                        {dropdownOpen && (
                            <div className={styles.dropdownMenu}>
                                <ul>
                                    <li onClick={() => handleTransform("rotate")}><img src={rotate} alt="rotate" /></li>
                                    <li onClick={() => handleTransform("horizontalflip")}><img src={flipV} alt="horizontal flip" /></li>
                                    <li onClick={() => handleTransform("verticalflip")}><img src={flipH} alt="vertical flip" /></li>
                                </ul>
                            </div>
                        )}
                          </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.filters}>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" />
                        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} name="" placeholder="Enter Description" />
                    </div>
                    <button onClick={handleSubmit}><img src={Buttons} alt="submit" /></button>
                </div>
            </div>
        </div>
    );
}

export default EditPopUp;
