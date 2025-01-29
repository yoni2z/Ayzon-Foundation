import React, { useEffect, useState } from "react";
import style from './gallery.module.css';
import topPic from "../../Assets/Images/Rectangle.jpg";

function Gallery() {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    fetch("https://ayzonfoundation.org/api/photo-gallery/")
      .then((response) => response.json())
      .then((data) => {
        const formattedImage = data.map((item) => ({
          name: item.photo,
          alt: "Gallery Image",
        }));
        setImages(formattedImage);
      })
      .catch((error) => console.log("Error fetching gallery data ", error));
  }, []);

  const container1_images = [];
  const container2_images = [];
  const container3_images = [];
  const interleavedImages = [];
  const collector1 = { image1: null, image2: null, image3: null };
  const collector2 = { image1: null, image2: null };
  let i = 0;

  while (i < images.length) {
    let z = 0;
    let m = 0;

    // Collect 3 images for Container 1
    while (z < 3 && i < images.length) {
      z += 1;
      collector1[`image${z}`] = images[i];
      i += 1;
    }
    container1_images.push({ ...collector1 });
    collector1.image1 = null;
    collector1.image2 = null;
    collector1.image3 = null;

    // Collect 1 image for Container 2
    if (i < images.length) {
      container2_images.push(images[i]);
      i += 1;
    }

    // Collect 2 images for Container 3
    while (m < 2 && i < images.length) {
      m += 1;
      collector2[`image${m}`] = images[i];
      i += 1;
    }
    container3_images.push({ ...collector2 });
    collector2.image1 = null;
    collector2.image2 = null;
  }

  // Interleave the containers
  const maxLength = Math.max(
    container1_images.length,
    container2_images.length,
    container3_images.length
  );

  for (let j = 0; j < maxLength; j++) {
    if (container1_images[j]) interleavedImages.push({ type: 'container1', data: container1_images[j] });
    if (container2_images[j]) interleavedImages.push({ type: 'container2', data: container2_images[j] });
    if (container3_images[j]) interleavedImages.push({ type: 'container3', data: container3_images[j] });
  }

  return (
    <div className={style.galleryCont}>
      <div className={style.topCont}>
        <img src={topPic} alt="Gallery Top" />
        <h1>GALLERY</h1>
      </div>
      <div className={style.galleryDesc}>
        <h2>THROUGH THE AYZON FOUNDATION LENS</h2>
        <p>
          Capturing moments that tell stories of resilience, hope, and
          transformation. Each photo reflects the heart and soul of Ayzon
          Foundation's mission. Through Ayzon's lens, witness the impact of
          empowerment and community. Join us in celebrating lives touched and
          futures brightened.
        </p>
      </div>
      <div className={style.imgCont}>
        {interleavedImages.map((item, index) => {
          if (item.type === "container1") {
            const { image1, image2, image3 } = item.data;
            return (
              <div key={`container1-${index}`} className={style.container1}>
                <div className={style.fullHeight}>
                  <img src={image1?.name} alt={image1?.alt} />
                </div>
                <div className={style.leftColumn}>
                  <div className={style.leftCol1}>
                    {image2 ? (
                      <img src={image2?.name} alt={image2?.alt} />
                    ) : null}
                  </div>
                  <div className={style.leftCol1}>
                    {image3 ? (
                      <img src={image3?.name} alt={image3?.alt} />
                    ) : null}
                  </div>
                </div>
              </div>
            );
          } else if (item.type === "container2") {
            return (
              <div key={`container2-${index}`} className={style.container2}>
                <img src={item.data.name} alt={item.data.alt} />
              </div>
            );
          } else if (item.type === "container3") {
            const { image1, image2 } = item.data;
            return (
              <div key={`container3-${index}`} className={style.container3}>
                <img src={image1?.name} alt={image1?.alt} />
                {image2 ? <img src={image2?.name} alt={image2?.alt} /> : null}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Gallery;

